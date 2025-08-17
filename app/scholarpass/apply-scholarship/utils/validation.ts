import { z } from "zod";

// Validation error interface for consistency
export interface ValidationErrors {
  [key: string]: string;
}

// Custom phone number regex (international format with country code)
const phoneRegex = /^\+\d{1,4}\d{4,14}$/;

// Custom zip code regex (US format)
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

// Zod schemas for each step
export const studentInformationSchema = z.object({
  firstName: z
    .string()
    .trim()
    // .min(1, "First name is required") // Commented for testing
    .max(50, "First name must be less than 50 characters")
    .optional(),

  lastName: z
    .string()
    .trim()
    // .min(1, "Last name is required") // Commented for testing
    .max(50, "Last name must be less than 50 characters")
    .optional(),

  email: z
    .string()
    .trim()
    // .min(1, "Email is required") // Commented for testing
    .email("Please enter a valid email address")
    .optional(),

  gradeLevel: z
    .string()
    // .min(1, "Grade level is required") // Commented for testing
    .optional(),

  institute: z.string().trim().optional(),

  customInstitute: z.string().trim().optional(),

  isInstituteNotListed: z.boolean().optional(),

  address: z
    .string()
    .trim()
    // .min(1, "Address is required") // Commented for testing
    .max(200, "Address must be less than 200 characters")
    .optional(),

  city: z
    .string()
    .trim()
    // .min(1, "City is required") // Commented for testing
    .max(100, "City must be less than 100 characters")
    .optional(),

  state: z
    .string()
    // .min(1, "State is required") // Commented for testing
    .optional(),

  zipCode: z
    .string()
    .trim()
    // .min(1, "Zip code is required") // Commented for testing
    .regex(zipCodeRegex, "Please enter a valid zip code (12345 or 12345-6789)")
    .optional(),

  dateOfBirth: z
    .string()
    .trim()
    // .min(1, "Date of birth is required") // Commented for testing
    .refine((date) => {
      if (!date) return true; // Allow empty for testing
      // Basic date format validation (MM/DD/YYYY)
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
      return dateRegex.test(date);
    }, "Please enter a valid date (MM/DD/YYYY)")
    .optional(),

  mobileNumber: z
    .string()
    .trim()
    // .min(1, "Mobile number is required") // Commented for testing
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional(),

  studentProfile: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.length <= 1000,
      "Student profile must be less than 1000 characters"
    ),
});
// Commented for testing - institute requirement
// .refine(
//   (data) => {
//     // Custom validation: institute is required if not marked as "not listed"
//     if (
//       !data.isInstituteNotListed &&
//       (!data.institute || data.institute.trim() === "")
//     ) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "Institute is required",
//     path: ["institute"],
//   }
// );

export const guardianInformationSchema = z.object({
  guardianFirstName: z
    .string()
    .trim()
    // .min(1, "Guardian first name is required") // Commented for testing
    .max(50, "Guardian first name must be less than 50 characters")
    .optional(),

  guardianLastName: z
    .string()
    .trim()
    // .min(1, "Guardian last name is required") // Commented for testing
    .max(50, "Guardian last name must be less than 50 characters")
    .optional(),

  jobTitle: z
    .string()
    .trim()
    // .min(1, "Job title is required") // Commented for testing
    .max(100, "Job title must be less than 100 characters")
    .optional(),

  relationshipToStudent: z
    .string()
    // .min(1, "Relationship is required") // Commented for testing
    .optional(),

  guardianEmail: z
    .string()
    .trim()
    // .min(1, "Email is required") // Commented for testing
    .email("Please enter a valid email address")
    .optional(),

  phoneNumber: z
    .string()
    .trim()
    // .min(1, "Phone number is required") // Commented for testing
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional(),
});

export const financialInformationSchema = z.object({
  totalHouseholdIncome: z
    .string()
    .trim()
    // .min(1, "Total household income is required") // Commented for testing
    .refine((income) => {
      if (!income) return true; // Allow empty for testing
      // Remove formatting and check if it's a valid number
      const cleanIncome = income.replace(/[,$\s]/g, "");
      const numericIncome = Number(cleanIncome);
      return !isNaN(numericIncome) && numericIncome >= 0;
    }, "Please enter a valid income amount")
    .optional(),

  numberOfPeopleInHousehold: z
    .number()
    // .min(1, "Number of people in household must be at least 1") // Commented for testing
    .max(20, "Number of people in household seems unusually high")
    .optional(),

  receivingGovernmentAssistance: z.boolean().optional(),

  assistanceTypes: z.array(z.string()).optional(),
});

export const courseSelectionSchema = z.object({
  selectedCourse: z
    .string()
    // .min(1, "Please select a course") // Commented for testing
    .optional(),

  selectedScholarships: z
    .array(z.string())
    // .min(1, "Please select at least one scholarship program") // Commented for testing
    .optional(),
});

export const applicationEssaySchema = z.object({
  essay: z
    .string()
    .trim()
    // .min(50, "Essay must be at least 50 characters long") // Commented for testing
    .max(5000, "Essay must not exceed 5000 characters")
    .optional(),
});

// Helper function to convert Zod errors to our ValidationErrors format
export const formatZodErrors = (error: z.ZodError): ValidationErrors => {
  const errors: ValidationErrors = {};

  error.issues.forEach((err) => {
    const field = err.path.join(".");
    errors[field] = err.message;
  });

  return errors;
};

// Validation functions using Zod schemas
export const validateStudentInformation = (data: any): ValidationErrors => {
  try {
    studentInformationSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return { general: "Validation error occurred" };
  }
};

export const validateGuardianInformation = (data: any): ValidationErrors => {
  try {
    guardianInformationSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return { general: "Validation error occurred" };
  }
};

export const validateFinancialInformation = (data: any): ValidationErrors => {
  try {
    financialInformationSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return { general: "Validation error occurred" };
  }
};

export const validateCourseSelection = (data: any): ValidationErrors => {
  try {
    courseSelectionSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return { general: "Validation error occurred" };
  }
};

export const validateApplicationEssay = (data: any): ValidationErrors => {
  try {
    applicationEssaySchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return { general: "Validation error occurred" };
  }
};

// Complete form schema for final validation
export const completeApplicationSchema = z.object({
  studentInformation: studentInformationSchema,
  guardianInformation: guardianInformationSchema,
  financialInformation: financialInformationSchema,
  courseSelection: courseSelectionSchema,
  applicationEssay: applicationEssaySchema,
});

// Export as completeFormSchema for React Hook Form
export const completeFormSchema = completeApplicationSchema;

// Validate the entire application
export const validateCompleteApplication = (data: any): ValidationErrors => {
  try {
    completeApplicationSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return { general: "Application validation error occurred" };
  }
};

// Type exports for better TypeScript integration
export type StudentInformationType = z.infer<typeof studentInformationSchema>;
export type GuardianInformationType = z.infer<typeof guardianInformationSchema>;
export type FinancialInformationType = z.infer<
  typeof financialInformationSchema
>;
export type CourseSelectionType = z.infer<typeof courseSelectionSchema>;
export type ApplicationEssayType = z.infer<typeof applicationEssaySchema>;
export type CompleteApplicationType = z.infer<typeof completeApplicationSchema>;
