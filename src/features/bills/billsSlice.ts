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
    /** Claim one unit of an item for a participant. Allows duplicates up to item.quantity. */
    claimItem(
      state,
      action: PayloadAction<{ itemId: string; participantId: string }>,
    ) {
      if (!state.activeBill) return;
      const item = state.activeBill.items.find(
        (i) => i.id === action.payload.itemId,
      );
      if (!item) return;
      // Don't exceed the item's total quantity
      if (item.claimedBy.length >= item.quantity) return;
      item.claimedBy.push(action.payload.participantId);
      // Derive splitType from unique claimers
      const unique = new Set(item.claimedBy);
      if (item.claimedBy.length === 0) {
        item.splitType = 'unclaimed';
      } else if (unique.size > 1) {
        item.splitType = 'shared';
      } else {
        item.splitType = 'single';
      }
    },
    /** Remove one unit claim for a participant. */
    unclaimItem(
      state,
      action: PayloadAction<{ itemId: string; participantId: string }>,
    ) {
      if (!state.activeBill) return;
      const item = state.activeBill.items.find(
        (i) => i.id === action.payload.itemId,
      );
      if (!item) return;
      const idx = item.claimedBy.indexOf(action.payload.participantId);
      if (idx !== -1) {
        item.claimedBy.splice(idx, 1);
      }
      const unique = new Set(item.claimedBy);
      if (item.claimedBy.length === 0) {
        item.splitType = 'unclaimed';
      } else if (unique.size > 1) {
        item.splitType = 'shared';
      } else {
        item.splitType = 'single';
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
