import { useQuery } from "@tanstack/react-query";
import { instituteApi, stateApi } from "../../services/institutes";

// Hook for fetching institutes with search
export const useInstitutes = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["institutes", searchQuery],
    queryFn: () => instituteApi.getInstitutes(searchQuery),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data.data.data, // Extract the data array from API response
  });
};

// Hook for fetching a single institute
export const useInstitute = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ["institute", id],
    queryFn: () => instituteApi.getInstitute(id),
    enabled: enabled && id > 0,
    staleTime: 5 * 60 * 1000,
    select: (data) => data.data.data,
  });
};

// Hook for fetching states
export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => stateApi.getStates(),
    staleTime: 30 * 60 * 1000, // 30 minutes - states don't change often
    select: (data) => data.data.data, // Extract the data array from API response
  });
};
