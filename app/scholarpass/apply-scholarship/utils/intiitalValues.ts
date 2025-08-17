import { ApplicationFormData } from "./types";

export const initialFormData: ApplicationFormData = {
  studentInformation: {
    firstName: "",
    lastName: "",
    email: "",
    gradeLevel: "",
    institute: "",
    customInstitute: "",
    isInstituteNotListed: false,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    mobileNumber: "+1",
    studentProfile: "",
  },
  guardianInformation: {
    guardianFirstName: "",
    guardianLastName: "",
    jobTitle: "",
    relationshipToStudent: "",
    guardianEmail: "",
    phoneNumber: "+1",
  },
  financialInformation: {
    totalHouseholdIncome: "",
    numberOfPeopleInHousehold: 1,
    receivingGovernmentAssistance: false,
    assistanceTypes: [],
  },
  courseSelection: {
    selectedCourse: "",
    selectedScholarships: [],
  },
  applicationEssay: {
    essay: "",
  },
};
