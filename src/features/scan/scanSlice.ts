import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {ScanStage, SelectedImage, ReceiptResponse} from '../../services/scanBillApi.types';

export type ScanStatus = 'idle' | 'capturing' | 'processing' | 'complete' | 'error';

interface ScanState {
  // Lifecycle
  status: ScanStatus;
  progress: number;          // 0-100
  stage: ScanStage | null;   // current backend stage
  stageLabel: string;        // human-readable label for UI

  // Source
  sourceType: 'camera' | 'gallery' | null;
  selectedImage: SelectedImage | null;

  // Job tracking
  scanJobId: string | null;
  receiptId: string | null;

  // Result
  receipt: ReceiptResponse | null;

  // Error
  errorMessage: string | null;
}

const initialState: ScanState = {
  status: 'idle',
  progress: 0,
  stage: null,
  stageLabel: '',
  sourceType: null,
  selectedImage: null,
  scanJobId: null,
  receiptId: null,
  receipt: null,
  errorMessage: null,
};

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    /** Set image source type */
    setSourceType(state, action: PayloadAction<'camera' | 'gallery' | null>) {
      state.sourceType = action.payload;
    },

    /** Store the selected image metadata */
    setSelectedImage(state, action: PayloadAction<SelectedImage>) {
      state.selectedImage = action.payload;
    },

    /** Mark scan as started, store the job id */
    startScan(state, action: PayloadAction<{scanJobId: string}>) {
      state.status = 'processing';
      state.scanJobId = action.payload.scanJobId;
      state.progress = 0;
      state.stage = 'created';
      state.stageLabel = 'Preparing upload...';
      state.errorMessage = null;
      state.receipt = null;
      state.receiptId = null;
    },

    /** Update progress from SSE/mock progress events */
    updateProgress(
      state,
      action: PayloadAction<{
        stage: ScanStage;
        progress: number;
        message?: string;
        receiptId?: string;
      }>,
    ) {
      const {stage, progress, message, receiptId} = action.payload;
      state.stage = stage;
      state.progress = progress;
      if (message) {
        state.stageLabel = message;
      }
      if (receiptId) {
        state.receiptId = receiptId;
      }
    },

    /** Scan completed — store the full receipt */
    scanComplete(state, action: PayloadAction<ReceiptResponse>) {
      state.status = 'complete';
      state.progress = 100;
      state.stage = 'completed';
      state.stageLabel = 'Done!';
      state.receipt = action.payload;
      state.receiptId = action.payload.id;
    },

    /** Scan failed */
    scanFailed(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.stage = 'failed';
      state.stageLabel = 'Processing failed';
      state.errorMessage = action.payload;
    },

    /** Full reset — back to idle */
    resetScan() {
      return initialState;
    },
  },
});

export const {
  setSourceType,
  setSelectedImage,
  startScan,
  updateProgress,
  scanComplete,
  scanFailed,
  resetScan,
} = scanSlice.actions;

export default scanSlice.reducer;
