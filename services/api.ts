import axios, { AxiosError, AxiosResponse } from "axios";
import Constants from 'expo-constants';

// API Base Configuration
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || "https://api.tutorsplan.com";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available (you'll implement this with AsyncStorage)
    // const token = getStoredToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Handle FormData - don't set Content-Type for FormData, let axios handle it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Log request in development
    if (__DEV__) {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data instanceof FormData ? "FormData" : config.data,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (__DEV__) {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized - redirect to login
          console.error("🔒 Unauthorized access");
          break;
        case 403:
          console.error("🚫 Forbidden access");
          break;
        case 404:
          console.error("🔍 Resource not found");
          break;
        case 500:
          console.error("🔥 Server error");
          break;
        default:
          console.error(`❌ API Error ${status}:`, data);
      }
    } else if (error.request) {
      console.error("🌐 Network Error:", error.message);
    } else {
      console.error("⚠️ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Generic API methods
export const api = {
  get: <T>(url: string, config = {}) =>
    apiClient.get<ApiResponse<T>>(url, config),

  post: <T>(url: string, data = {}, config = {}) =>
    apiClient.post<ApiResponse<T>>(url, data, config),

  put: <T>(url: string, data = {}, config = {}) =>
    apiClient.put<ApiResponse<T>>(url, data, config),

  delete: <T>(url: string, config = {}) =>
    apiClient.delete<ApiResponse<T>>(url, config),

  patch: <T>(url: string, data = {}, config = {}) =>
    apiClient.patch<ApiResponse<T>>(url, data, config),
};

export default api;
