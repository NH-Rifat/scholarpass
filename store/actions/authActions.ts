import { clearAuthData, loadAuthData } from '@/utils/authStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../index';
import { loginFailure, loginStart, loginSuccess, logout as logoutAction, User } from '../slices/authSlice';

// Restore auth state from AsyncStorage using createAsyncThunk
export const restoreAuthState = createAsyncThunk(
  'auth/restoreAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const { token, user } = await loadAuthData();

      if (token && user) {
        return { user };
      } else {
        return rejectWithValue('No auth data found');
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to restore auth state'
      );
    }
  }
);

// Async action creators
export const login = (userData: { user: User; token?: string }) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      dispatch(loginSuccess(userData));
    } catch (error) {
      dispatch(loginFailure('Login failed'));
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    try {
      clearAuthData();
      dispatch(logoutAction());
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };
};
