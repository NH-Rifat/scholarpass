export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: 'tutor' | 'student' | 'guardian' | '';
  agreeToTerms: boolean;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  role?: string;
  agreeToTerms?: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobileNumber = (mobile: string): boolean => {
  const mobileRegex = /^[0-9]{10,15}$/;
  return mobileRegex.test(mobile.replace(/[^\d]/g, ''));
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // First Name validation
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name validation
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Mobile Number validation
  if (!formData.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required';
  } else if (!validateMobileNumber(formData.mobileNumber)) {
    errors.mobileNumber = 'Please enter a valid mobile number';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Role validation
  if (!formData.role) {
    errors.role = 'Please select your role';
  }

  // Terms validation
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
