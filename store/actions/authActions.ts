import { AppDispatch } from '../index';
import { loginFailure, loginStart, loginSuccess, logout as logoutAction, User } from '../slices/authSlice';

// Async action creators
export const login = (userData: { user: User; token?: string }) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      dispatch(loginSuccess(userData));
      
      // You can add additional logic here like:
      // - Save token to AsyncStorage
      // - Set up axios interceptors
      // - Analytics tracking
      
      console.log('✅ User logged in successfully:', userData.user.email);
    } catch (error) {
      dispatch(loginFailure('Login failed'));
      console.error('❌ Login action failed:', error);
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    try {
      // Clear any stored tokens, reset axios headers, etc.
      // AsyncStorage.removeItem('authToken');
      
      dispatch(logoutAction());
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('❌ Logout action failed:', error);
    }
  };
};

// Thunk for checking authentication status on app start
export const initializeAuth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // Check if user has stored auth data
      // const token = await AsyncStorage.getItem('authToken');
      // const userData = await AsyncStorage.getItem('userData');
      
      // if (token && userData) {
      //   const user = JSON.parse(userData);
      //   dispatch(loginSuccess({ user, token }));
      // }
      
      console.log('🔄 Auth initialization completed');
    } catch (error) {
      console.error('❌ Auth initialization failed:', error);
    }
  };
};
