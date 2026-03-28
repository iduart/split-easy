import {useCallback, useRef} from 'react';
import {Alert, Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  type ImagePickerResponse,
  type Asset,
} from 'react-native-image-picker';
import {useAppDispatch, useAppSelector} from '../app/store';
import {
  setSourceType,
  setSelectedImage,
  startScan,
  updateProgress,
  scanComplete,
  scanFailed,
  resetScan,
} from '../features/scan/scanSlice';
import {getScanBillApi} from '../services/scanBillApi';
import type {SelectedImage} from '../services/scanBillApi.types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp'];

export function useScanBill() {
  const dispatch = useAppDispatch();
  const scanState = useAppSelector(state => state.scan);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  /** Normalize an image-picker asset to our SelectedImage type */
  const normalizeAsset = useCallback(
    (asset: Asset): SelectedImage | null => {
      const uri = asset.uri;
      const fileName = asset.fileName ?? `receipt_${Date.now()}.jpg`;
      const mimeType = (asset.type ?? 'image/jpeg') as SelectedImage['mimeType'];
      const fileSize = asset.fileSize ?? 0;

      if (!uri) return null;
      if (!ALLOWED_MIME_TYPES.includes(mimeType)) return null;
      if (fileSize > MAX_FILE_SIZE) return null;

      return {uri, fileName, mimeType, fileSize, width: asset.width, height: asset.height};
    },
    [],
  );

  /** Handle picker response (shared by camera & gallery) */
  const handlePickerResponse = useCallback(
    (
      response: ImagePickerResponse,
      source: 'camera' | 'gallery',
      onImageReady: () => void,
    ) => {
      if (response.didCancel) {
        return; // User cancelled — do nothing
      }

      if (response.errorCode) {
        if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera Unavailable', 'Your device does not have a camera.');
        } else if (response.errorCode === 'permission') {
          Alert.alert(
            'Permission Denied',
            `Please grant ${source === 'camera' ? 'camera' : 'photo library'} access in Settings.`,
          );
        } else {
          Alert.alert('Error', response.errorMessage ?? 'Could not select image.');
        }
        return;
      }

      const asset = response.assets?.[0];
      if (!asset) return;

      const image = normalizeAsset(asset);
      if (!image) {
        Alert.alert(
          'Invalid Image',
          'The selected file is too large (max 10 MB) or not a supported format (JPEG, PNG, HEIC).',
        );
        return;
      }

      // Reset any previous scan state before starting fresh
      dispatch(resetScan());
      dispatch(setSourceType(source));
      dispatch(setSelectedImage(image));
      onImageReady();
    },
    [dispatch, normalizeAsset],
  );

  /** Launch camera and handle result */
  const pickFromCamera = useCallback(
    (onImageReady: () => void) => {
      launchCamera(
        {
          mediaType: 'photo',
          cameraType: 'back',
          quality: 0.8,
          maxWidth: 2048,
          maxHeight: 2048,
          saveToPhotos: false,
        },
        response => handlePickerResponse(response, 'camera', onImageReady),
      );
    },
    [handlePickerResponse],
  );

  /** Launch gallery and handle result */
  const pickFromGallery = useCallback(
    (onImageReady: () => void) => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.8,
          maxWidth: 2048,
          maxHeight: 2048,
          selectionLimit: 1,
        },
        response => handlePickerResponse(response, 'gallery', onImageReady),
      );
    },
    [handlePickerResponse],
  );

  /** Start the full scan pipeline (call after navigating to ProcessingScreen) */
  const startScanFlow = useCallback(async () => {
    const image = scanState.selectedImage;
    if (!image) {
      dispatch(scanFailed('No image selected'));
      return;
    }

    const api = getScanBillApi();

    try {
      // 1. Create scan job
      const createRes = await api.createScan({
        sourceType: scanState.sourceType ?? 'camera',
        fileName: image.fileName,
        mimeType: image.mimeType,
        fileSize: image.fileSize,
      });

      dispatch(startScan({scanJobId: createRes.scanId}));

      // 2. Upload image
      await api.uploadImage(createRes.uploadUrl, image);

      // 3. Trigger processing
      await api.processScan(createRes.scanId);

      // 4. Subscribe to progress
      unsubscribeRef.current = api.subscribeToProgress(
        createRes.scanId,
        async event => {
          dispatch(
            updateProgress({
              stage: event.stage,
              progress: event.progress,
              message: event.message,
              receiptId: event.receiptId,
            }),
          );

          if (event.stage === 'completed' && event.receiptId) {
            // 5. Fetch the full receipt
            try {
              const receipt = await api.getReceipt(event.receiptId);
              dispatch(scanComplete(receipt));
            } catch {
              dispatch(scanFailed('Failed to load receipt data.'));
            }
          } else if (event.stage === 'failed') {
            dispatch(scanFailed(event.message ?? 'Processing failed.'));
          }
        },
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      dispatch(scanFailed(msg));
    }
  }, [dispatch, scanState.selectedImage, scanState.sourceType]);

  /** Retry: reset and re-run */
  const retry = useCallback(() => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    // Keep the selected image but reset the job state
    const image = scanState.selectedImage;
    const source = scanState.sourceType;
    dispatch(resetScan());
    if (image) dispatch(setSelectedImage(image));
    if (source) dispatch(setSourceType(source));
  }, [dispatch, scanState.selectedImage, scanState.sourceType]);

  /** Full cancel / cleanup */
  const cancel = useCallback(() => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    dispatch(resetScan());
  }, [dispatch]);

  return {
    scanState,
    pickFromCamera,
    pickFromGallery,
    startScanFlow,
    retry,
    cancel,
  };
}
