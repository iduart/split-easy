import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveBill, BillSummary } from '../../types';

interface BillsState {
  activeBill: ActiveBill | null;
  recentBills: BillSummary[];
}

const initialState: BillsState = {
  activeBill: null,
  recentBills: [],
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setActiveBill(state, action: PayloadAction<ActiveBill>) {
      state.activeBill = action.payload;
    },
    clearActiveBill(state) {
      state.activeBill = null;
    },
    setRecentBills(state, action: PayloadAction<BillSummary[]>) {
      state.recentBills = action.payload;
    },
    claimItem(
      state,
      action: PayloadAction<{ itemId: string; participantId: string }>,
    ) {
      if (!state.activeBill) return;
      const item = state.activeBill.items.find(
        (i) => i.id === action.payload.itemId,
      );
      if (item && !item.claimedBy.includes(action.payload.participantId)) {
        item.claimedBy.push(action.payload.participantId);
        item.splitType =
          item.claimedBy.length > 1 ? 'shared' : 'single';
      }
    },
    unclaimItem(
      state,
      action: PayloadAction<{ itemId: string; participantId: string }>,
    ) {
      if (!state.activeBill) return;
      const item = state.activeBill.items.find(
        (i) => i.id === action.payload.itemId,
      );
      if (item) {
        item.claimedBy = item.claimedBy.filter(
          (id) => id !== action.payload.participantId,
        );
        if (item.claimedBy.length === 0) {
          item.splitType = 'unclaimed';
        } else if (item.claimedBy.length === 1) {
          item.splitType = 'single';
        } else {
          item.splitType = 'shared';
        }
      }
    },
  },
});

export const {
  setActiveBill,
  clearActiveBill,
  setRecentBills,
  claimItem,
  unclaimItem,
} = billsSlice.actions;
export default billsSlice.reducer;
