import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isOnboarded: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isOnboarded: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.user = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: undefined,
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setOnboarded(state, action: PayloadAction<boolean>) {
      state.isOnboarded = action.payload;
    },
  },
});

export const { login, logout, setOnboarded } = authSlice.actions;
export default authSlice.reducer;
