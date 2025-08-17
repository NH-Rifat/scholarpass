import { z } from "zod";
import { completeFormSchema } from "./validation";

export interface StudentInformation {
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: string;
  institute: string;
  customInstitute?: string;
  isInstituteNotListed: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  mobileNumber: string;
  studentProfile: string;
}

export interface GuardianInformation {
  guardianFirstName: string;
  guardianLastName: string;
  jobTitle: string;
  relationshipToStudent: string;
  guardianEmail: string;
  phoneNumber: string;
}

export interface FinancialInformation {
  totalHouseholdIncome: string;
  numberOfPeopleInHousehold: number;
  receivingGovernmentAssistance: boolean;
  assistanceTypes: string[];
}

export interface CourseSelection {
  selectedCourse: string;
  selectedScholarships: string[];
}

export interface ApplicationEssay {
  essay: string;
}

// Use Zod inferred type instead
export type ApplicationFormData = z.infer<typeof completeFormSchema>;

// Updated props interface for React Hook Form
export interface FormStepProps {
  nextStep: () => void;
  prevStep: () => void;
  isLastStep?: boolean;
  onSubmit?: () => void;
}

export interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}
