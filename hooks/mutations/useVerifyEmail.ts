import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authApi, VerifyEmailRequest } from "../../services/auth";

export interface UseVerifyEmailOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
}

export const useVerifyEmail = (options?: UseVerifyEmailOptions) => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
    onSuccess: (response) => {
      console.log("✅ Email verification successful:", response.data);
      options?.onSuccess?.(response.data);
    },
    onError: (error: AxiosError) => {
      console.error("❌ Email verification failed:", error);
      options?.onError?.(error);
    },
  });
};

export const useResendVerification = (options?: UseVerifyEmailOptions) => {
  return useMutation({
    mutationFn: (email: string) => authApi.resendVerification(email),
    onSuccess: (response) => {
      console.log("✅ Verification code resent:", response.data);
      options?.onSuccess?.(response.data);
    },
    onError: (error: AxiosError) => {
      console.error("❌ Resend verification failed:", error);
      options?.onError?.(error);
    },
  });
};
