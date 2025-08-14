import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authApi, LoginRequest } from "../../services/auth";

export interface UseLoginOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      options?.onSuccess?.(response);
    },
    onError: (error: AxiosError) => {
      options?.onError?.(error);
    },
  });
};
