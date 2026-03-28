/**
 * Scan Bill API — interface + factory.
 *
 * The service layer depends on this interface. Swap the implementation
 * by changing the factory return or via an env flag.
 */

import type {
  CreateScanRequest,
  CreateScanResponse,
  ProcessScanResponse,
  ProgressEvent,
  ReceiptResponse,
  SelectedImage,
} from './scanBillApi.types';

export interface ScanBillApi {
  /** POST /scans — Create scan job, get presigned upload URL */
  createScan(request: CreateScanRequest): Promise<CreateScanResponse>;

  /** Upload image to presigned URL (or simulate) */
  uploadImage(uploadUrl: string, image: SelectedImage): Promise<void>;

  /** POST /scans/:id/process — Trigger Textract processing */
  processScan(scanId: string): Promise<ProcessScanResponse>;

  /**
   * Subscribe to scan progress.
   * Calls onProgress for each stage update.
   * Returns an unsubscribe function.
   */
  subscribeToProgress(
    scanId: string,
    onProgress: (event: ProgressEvent) => void,
  ): () => void;

  /** GET /receipts/:id — Fetch processed receipt */
  getReceipt(receiptId: string): Promise<ReceiptResponse>;
}

// --- Factory ---

import { MockScanBillApi } from './mockScanBillApi';

// When backend is ready, import RealScanBillApi and switch here.
// const USE_REAL_API = !__DEV__;
const USE_REAL_API = false;

let _instance: ScanBillApi | null = null;

export function getScanBillApi(): ScanBillApi {
  if (_instance) return _instance;

  if (USE_REAL_API) {
    // _instance = new RealScanBillApi(apiBaseUrl, getAuthToken);
    throw new Error('Real API not yet implemented. Set USE_REAL_API = false.');
  }

  _instance = new MockScanBillApi();
  return _instance;
}
