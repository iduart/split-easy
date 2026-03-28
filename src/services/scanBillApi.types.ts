/**
 * Frontend contracts mirroring the SplitEasyBackend API.
 * Keep these aligned with backend endpoint schemas.
 */

// --- Image / File ---

export interface SelectedImage {
  uri: string;
  fileName: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/heic';
  fileSize: number; // bytes
  width?: number;
  height?: number;
}

// --- POST /scans ---

export interface CreateScanRequest {
  sourceType: 'camera' | 'gallery';
  fileName: string;
  mimeType: string;
  fileSize: number;
}

export interface CreateScanResponse {
  scanId: string;
  uploadUrl: string;
  uploadHeaders: Record<string, string>;
  expiresIn: number;
}

// --- POST /scans/:id/process ---

export interface ProcessScanResponse {
  scanId: string;
  status: string;
  message: string;
}

// --- GET /scans/:id/progress (SSE) ---

export type ScanStage =
  | 'created'
  | 'uploading'
  | 'processing'
  | 'normalizing'
  | 'completed'
  | 'failed';

export interface ProgressEvent {
  stage: ScanStage;
  progress: number; // 0-100, or -1 for failure
  message?: string;
  receiptId?: string;
}

// --- GET /receipts/:id ---

export interface ReceiptLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;   // cents
  totalPrice: number;  // cents
  confidence: number;  // 0.0 - 1.0
}

export interface ReceiptResponse {
  id: string;
  scanId: string;
  merchantName: string | null;
  merchantAddress: string | null;
  transactionDate: string | null;
  currency: string;
  subtotal: number | null;
  taxTotal: number | null;
  tipAmount: number | null;
  totalAmount: number | null;
  confidence: number;
  status: 'completed' | 'needs_review';
  warnings: string[];
  lineItems: ReceiptLineItem[];
  imageUrl: string;
  createdAt: string;
}

// --- Stage labels for the UI ---

export const STAGE_LABELS: Record<ScanStage, string> = {
  created: 'Preparing upload...',
  uploading: 'Uploading receipt...',
  processing: 'Extracting line items...',
  normalizing: 'Calculating totals...',
  completed: 'Done!',
  failed: 'Processing failed',
};
