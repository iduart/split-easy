import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabName, ClaimFilter } from '../../types';

interface UiState {
  activeTab: TabName;
  claimFilter: ClaimFilter;
  selectedParticipantId: string | null;
  onboardingStep: number;
}

const initialState: UiState = {
  activeTab: 'home',
  claimFilter: 'all',
  selectedParticipantId: null,
  onboardingStep: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabName>) {
      state.activeTab = action.payload;
    },
    setClaimFilter(state, action: PayloadAction<ClaimFilter>) {
      state.claimFilter = action.payload;
    },
    setSelectedParticipant(state, action: PayloadAction<string | null>) {
      state.selectedParticipantId = action.payload;
    },
    setOnboardingStep(state, action: PayloadAction<number>) {
      state.onboardingStep = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setClaimFilter,
  setSelectedParticipant,
  setOnboardingStep,
} = uiSlice.actions;
export default uiSlice.reducer;
