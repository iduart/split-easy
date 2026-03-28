import type {
  ScanBillApi,
} from './scanBillApi';
import type {
  CreateScanRequest,
  CreateScanResponse,
  ProcessScanResponse,
  ProgressEvent,
  ReceiptResponse,
  SelectedImage,
} from './scanBillApi.types';

/** Simulates realistic staged delays matching backend SSE progress model. */
export class MockScanBillApi implements ScanBillApi {
  private scanCounter = 0;

  async createScan(request: CreateScanRequest): Promise<CreateScanResponse> {
    await delay(300);
    this.scanCounter++;
    const scanId = `scan_mock_${Date.now()}_${this.scanCounter}`;
    return {
      scanId,
      uploadUrl: `https://mock-s3.local/${scanId}.jpg`,
      uploadHeaders: {'Content-Type': request.mimeType},
      expiresIn: 300,
    };
  }

  async uploadImage(_uploadUrl: string, _image: SelectedImage): Promise<void> {
    // Simulate upload time proportional to a ~3MB image
    await delay(800);
  }

  async processScan(scanId: string): Promise<ProcessScanResponse> {
    await delay(200);
    return {
      scanId,
      status: 'processing',
      message: 'Receipt processing started',
    };
  }

  subscribeToProgress(
    scanId: string,
    onProgress: (event: ProgressEvent) => void,
  ): () => void {
    let cancelled = false;

    const run = async () => {
      const stages: {event: ProgressEvent; delayMs: number}[] = [
        {event: {stage: 'created', progress: 5, message: 'Preparing upload...'}, delayMs: 400},
        {event: {stage: 'uploading', progress: 15, message: 'Uploading receipt...'}, delayMs: 600},
        {event: {stage: 'uploading', progress: 20, message: 'Uploading receipt...'}, delayMs: 400},
        {event: {stage: 'processing', progress: 30, message: 'Analyzing receipt...'}, delayMs: 800},
        {event: {stage: 'processing', progress: 42, message: 'Extracting line items...'}, delayMs: 1000},
        {event: {stage: 'processing', progress: 55, message: 'Extracting line items...'}, delayMs: 900},
        {event: {stage: 'processing', progress: 65, message: 'Extracting line items...'}, delayMs: 800},
        {event: {stage: 'normalizing', progress: 80, message: 'Calculating totals...'}, delayMs: 600},
        {event: {stage: 'normalizing', progress: 92, message: 'Finalizing...'}, delayMs: 500},
        {event: {stage: 'completed', progress: 100, receiptId: `rcpt_mock_${Date.now()}`}, delayMs: 0},
      ];

      for (const {event, delayMs} of stages) {
        if (cancelled) return;
        onProgress(event);
        if (delayMs > 0) {
          await delay(delayMs);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }

  async getReceipt(_receiptId: string): Promise<ReceiptResponse> {
    await delay(200);
    return MOCK_RECEIPT;
  }
}

// --- Helpers ---

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Realistic mock receipt matching backend ReceiptResponse ---

const MOCK_RECEIPT: ReceiptResponse = {
  id: 'rcpt_mock_001',
  scanId: 'scan_mock_001',
  merchantName: 'Crepes & Waffles',
  merchantAddress: 'Calle 85 #15-21, Bogotá',
  transactionDate: '2026-03-28',
  currency: 'USD',
  subtotal: 8950,    // $89.50
  taxTotal: 895,     // $8.95
  tipAmount: 0,
  totalAmount: 9845, // $98.45
  confidence: 0.94,
  status: 'completed',
  warnings: [],
  lineItems: [
    {
      id: 'li_001',
      description: 'Crepe de Pollo',
      quantity: 2,
      unitPrice: 1400,
      totalPrice: 2800,
      confidence: 0.97,
    },
    {
      id: 'li_002',
      description: 'Limonada Natural',
      quantity: 3,
      unitPrice: 550,
      totalPrice: 1650,
      confidence: 0.93,
    },
    {
      id: 'li_003',
      description: 'Ensalada Caesar',
      quantity: 1,
      unitPrice: 1200,
      totalPrice: 1200,
      confidence: 0.95,
    },
    {
      id: 'li_004',
      description: 'Filete de Salmón',
      quantity: 1,
      unitPrice: 1800,
      totalPrice: 1800,
      confidence: 0.91,
    },
    {
      id: 'li_005',
      description: 'Brownie con Helado',
      quantity: 2,
      unitPrice: 750,
      totalPrice: 1500,
      confidence: 0.96,
    },
  ],
  imageUrl: 'https://mock-s3.local/receipt.jpg',
  createdAt: new Date().toISOString(),
};
