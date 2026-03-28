import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScanStatus } from '../../types';

interface ScanState {
  status: ScanStatus;
  progress: number;
  sourceType: 'camera' | 'gallery' | null;
}

const initialState: ScanState = {
  status: 'idle',
  progress: 0,
  sourceType: null,
};

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<ScanStatus>) {
      state.status = action.payload;
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setSourceType(state, action: PayloadAction<'camera' | 'gallery' | null>) {
      state.sourceType = action.payload;
    },
    resetScan(state) {
      state.status = 'idle';
      state.progress = 0;
      state.sourceType = null;
    },
  },
});

export const { setStatus, setProgress, setSourceType, resetScan } =
  scanSlice.actions;
export default scanSlice.reducer;
