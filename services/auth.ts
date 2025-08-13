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
  role: "student" | "teacher" | "institution";
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_super_admin: boolean;
  roles: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Auth API Service
export const authApi = {
  // Login user
  login: (data: LoginRequest) => {
    const loginPayload = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };
    return api.post<AuthResponse>("/login", loginPayload);
  },

  // Register user
  register: (data: RegisterRequest) => {
    // Validate required fields before sending
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password || !data.role) {
      throw new Error('Missing required fields for registration');
    }

    // Debug the data being sent
    const registerData = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      username: `${data.firstName.trim().toLowerCase()} ${data.lastName.trim().toLowerCase()}`,
      email: data.email.trim().toLowerCase(),
      phone_number: data.phone.trim(),
      password_hash: data.password,
      roles: JSON.stringify([data.role.toLowerCase()])
    };
    return api.post<{ user: User; message: string }>("/app-users", registerData);
  },

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
