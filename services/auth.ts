import { api } from "./api";

// Auth API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher" | "institution";
  terms: boolean;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "student" | "teacher" | "institution";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Auth API Service
export const authApi = {
  // Login user
  login: (data: LoginRequest) => api.post<AuthResponse>("/auth/login", data),

  // Register user
  register: (data: RegisterRequest) =>
    api.post<{ user: User; message: string }>("/auth/register", data),

  // Verify email
  verifyEmail: (data: VerifyEmailRequest) =>
    api.post<AuthResponse>("/auth/verify-email", data),

  // Resend verification code
  resendVerification: (email: string) =>
    api.post<{ message: string }>("/auth/resend-verification", { email }),

  // Logout user
  logout: () => api.post<{ message: string }>("/auth/logout"),

  // Refresh token
  refreshToken: (refreshToken: string) =>
    api.post<{ token: string; refreshToken: string }>("/auth/refresh", {
      refreshToken,
    }),

  // Get current user
  me: () => api.get<User>("/auth/me"),

  // Forgot password
  forgotPassword: (email: string) =>
    api.post<{ message: string }>("/auth/forgot-password", { email }),

  // Reset password
  resetPassword: (token: string, password: string) =>
    api.post<{ message: string }>("/auth/reset-password", {
      token,
      password,
    }),
};
