import { api } from "./api";

// Institute API Types
export interface Institute {
  id: number;
  name: string;
  address: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  logo?: string;
  verified: boolean;
  rating_score: number;
  archive: boolean;
  country: {
    id: number;
    name: string;
  };
  state: {
    id: number;
    name: string;
  };
  verified_by_user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  zone: {
    id: number;
    name: string;
  };
  master_institute: {
    id: number;
    name: string;
  };
  master_institute_type: {
    id: number;
    name: string;
  };
  assigned_by_employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  tutors: Array<{
    id: number;
    name: string;
    job_title?: string;
  }>;
  student_count: number;
  course_count: number;
}

// State API Types
export interface State {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  ticker: string;
  master_country_id: number;
}

// Institute API Service
export const instituteApi = {
  // Get all institutes with search capability
  getInstitutes: (searchQuery?: string) => {
    const params = searchQuery ? { search: searchQuery } : {};
    return api.get<Institute[]>("/institutes", { params });
  },

  // Get institute by ID
  getInstitute: (id: number) => api.get<Institute>(`/institutes/${id}`),
};

// State API Service
export const stateApi = {
  // Get all states
  getStates: () => api.get<State[]>("/master-states"),

  // Get state by ID
  getState: (id: number) => api.get<State>(`/master-states/${id}`),
};
