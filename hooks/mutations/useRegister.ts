import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authApi, RegisterRequest } from "../../services/auth";

export interface UseRegisterOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      console.log("✅ Registration successful:", response.data);
      options?.onSuccess?.(response.data);
    },
    onError: (error: AxiosError) => {
      console.error("❌ Registration failed:", error);
      options?.onError?.(error);
    },
  });
};
