export interface VerifyEmailFormData {
  code: string;
  email: string;
}

export interface VerifyEmailValidationErrors {
  code?: string;
  general?: string;
}

export const validateVerificationCode = (code: string): boolean => {
  // Remove any spaces or dashes
  const cleanCode = code.replace(/\s|-/g, "");

  // Check if it's exactly 6 digits
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(cleanCode);
};

export const validateVerifyEmailForm = (
  formData: VerifyEmailFormData
): VerifyEmailValidationErrors => {
  const errors: VerifyEmailValidationErrors = {};

  // Code validation
  if (!formData.code.trim()) {
    errors.code = "Verification code is required";
  } else if (!validateVerificationCode(formData.code)) {
    errors.code = "Please enter a valid 6-digit code";
  }

  return errors;
};

export const hasValidationErrors = (
  errors: VerifyEmailValidationErrors
): boolean => {
  return Object.keys(errors).length > 0;
};

export const formatVerificationCode = (code: string): string => {
  // Remove any non-numeric characters
  const numericOnly = code.replace(/\D/g, "");

  // Limit to 6 digits
  const limited = numericOnly.slice(0, 6);

  return limited;
};
