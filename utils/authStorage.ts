import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../store/slices/authSlice';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const saveAuthData = async (token: string, userData: User) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('❌ Error saving auth data:', error);
  }
};

export const loadAuthData = async () => {
  try {
    const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
    const userJson = await AsyncStorage.getItem(USER_KEY);
    const savedUser = userJson ? JSON.parse(userJson) : null;
    
    return { token: savedToken, user: savedUser };
  } catch (error) {
    console.error('❌ Error loading auth data:', error);
    return { token: null, user: null };
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('❌ Error clearing auth data:', error);
  }
};
