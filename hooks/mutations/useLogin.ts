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
      // Here you would typically store the token in AsyncStorage
      options?.onSuccess?.(response.data);
    },
    onError: (error: AxiosError) => {
      options?.onError?.(error);
    },
  });
};
