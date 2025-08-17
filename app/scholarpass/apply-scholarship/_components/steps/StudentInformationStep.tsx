import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useInstitutes,
  useStates,
} from "../../../../../hooks/queries/useInstitutes";
import { gradeLevels, mockInstitutes, mockStates } from "../../utils/data";
import { ApplicationFormData, FormStepProps } from "../../utils/types";
import { ControlledDatePicker } from "../ControlledDatePicker";
import { ControlledPhoneInput } from "../ControlledPhoneInput";
import { ControlledSearchableSelect } from "../ControlledSearchableSelect";
import {
  ControlledCheckbox,
  ControlledInput,
  ControlledSelect,
} from "../RHFFormComponents";

export const StudentInformationStep: React.FC<FormStepProps> = ({
  nextStep,
}) => {
  const {
    trigger,
    formState: { errors },
    watch,
  } = useFormContext<ApplicationFormData>();

  const [instituteSearchQuery, setInstituteSearchQuery] = useState("");

  // Watch the checkbox value to conditionally show/hide fields
  const isInstituteNotListed = watch("studentInformation.isInstituteNotListed");

  // API calls for institutes and states with fallback to mock data
  const {
    data: institutesData,
    isLoading: institutesLoading,
    isError: institutesError,
  } = useInstitutes(instituteSearchQuery);

  console.log(institutesData);

  const {
    data: statesData,
    isLoading: statesLoading,
    isError: statesError,
  } = useStates();
  console.log(statesData);

  // Use API data if available, otherwise fall back to mock data
  const institutes =
    !institutesError && institutesData ? institutesData : mockInstitutes;
  const states = !statesError && statesData ? statesData : mockStates;

  const handleNext = async () => {
    // Validate only student information fields
    const stepFields = [
      "studentInformation.firstName",
      "studentInformation.lastName",
      "studentInformation.email",
      "studentInformation.gradeLevel",
      ...(isInstituteNotListed
        ? ["studentInformation.customInstitute"]
        : ["studentInformation.institute"]),
      "studentInformation.address",
      "studentInformation.city",
      "studentInformation.state",
      "studentInformation.zipCode",
      "studentInformation.dateOfBirth",
      "studentInformation.mobileNumber",
      "studentInformation.studentProfile",
    ];

    const isValid = await trigger(stepFields as any);

    if (isValid) {
      nextStep();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Feather name="user" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.title}>Student Information</Text>
          <Text style={styles.subtitle}>
            Please provide the student's personal information and contact
            details.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <ControlledInput
                name="studentInformation.firstName"
                label="First Name"
                placeholder="Enter first name"
                icon={<Feather name="user" size={18} color="#6B7280" />}
              />
            </View>
            <View style={styles.halfWidth}>
              <ControlledInput
                name="studentInformation.lastName"
                label="Last Name"
                placeholder="Enter last name"
                icon={<Feather name="user" size={18} color="#6B7280" />}
              />
            </View>
          </View>

          <ControlledInput
            name="studentInformation.email"
            label="Email Address"
            placeholder="student@example.com"
            keyboardType="email-address"
            icon={<MaterialIcons name="email" size={18} color="#6B7280" />}
          />

          <ControlledSelect
            name="studentInformation.gradeLevel"
            label="Grade Level"
            options={gradeLevels}
            placeholder="Select grade level"
          />

          <View style={styles.instituteSection}>
            <Text style={styles.sectionTitle}>
              <Feather name="home" size={16} color="#8B5CF6" /> Institute
              Information
            </Text>
            <Text style={styles.sectionSubtitle}>
              Search for your school, college, or educational institute
            </Text>

            {!isInstituteNotListed && (
              <ControlledSearchableSelect
                name="studentInformation.institute"
                label="Select Your Institute"
                placeholder="Search your educational institute"
                options={institutes}
                isLoading={institutesLoading}
                onSearch={setInstituteSearchQuery}
                icon={<Feather name="search" size={18} color="#6B7280" />}
              />
            )}

            {isInstituteNotListed && (
              <View style={styles.customInstituteContainer}>
                <ControlledInput
                  name="studentInformation.customInstitute"
                  label="Enter Your Institute Name"
                  placeholder="Type your institute name here"
                  icon={<Feather name="edit-3" size={18} color="#8B5CF6" />}
                />
                <View style={styles.customInstituteNote}>
                  <Feather name="info" size={16} color="#F59E0B" />
                  <Text style={styles.customInstituteNoteText}>
                    Please enter the full name of your educational institute
                  </Text>
                </View>
              </View>
            )}

            <ControlledCheckbox
              name="studentInformation.isInstituteNotListed"
              label="My institute is not listed"
            />
          </View>

          <ControlledInput
            name="studentInformation.address"
            label="Address"
            placeholder="Enter street address"
            icon={
              <MaterialIcons name="location-on" size={18} color="#6B7280" />
            }
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <ControlledInput
                name="studentInformation.city"
                label="City"
                placeholder="Enter city"
                icon={
                  <MaterialIcons
                    name="location-city"
                    size={18}
                    color="#6B7280"
                  />
                }
              />
            </View>
            <View style={styles.halfWidth}>
              <ControlledSearchableSelect
                name="studentInformation.state"
                label="State"
                placeholder="State"
                options={states}
                isLoading={statesLoading}
              />
            </View>
          </View>

          <ControlledInput
            name="studentInformation.zipCode"
            label="Zip Code"
            placeholder="Enter zip code"
            keyboardType="numeric"
            icon={
              <MaterialIcons name="mail-outline" size={18} color="#6B7280" />
            }
          />

          <ControlledDatePicker
            name="studentInformation.dateOfBirth"
            label="Date of Birth"
            placeholder="mm/dd/yyyy"
            icon={<Feather name="calendar" size={18} color="#6B7280" />}
            maximumDate={new Date()} // Can't select future dates
            minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
          />

          <ControlledPhoneInput
            name="studentInformation.mobileNumber"
            label="Mobile Number"
            placeholder="123-456-7890"
            icon={<Feather name="phone" size={18} color="#6B7280" />}
          />

          <ControlledInput
            name="studentInformation.studentProfile"
            label="Student Profile (Optional)"
            placeholder="Tell us a bit about yourself, your interests, and educational goals..."
            multiline
            numberOfLines={4}
            icon={<Feather name="edit-3" size={18} color="#6B7280" />}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next Step</Text>
          <Feather name="arrow-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    padding: 24,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  instituteSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  buttonContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  nextButton: {
    backgroundColor: "#8B5CF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  customInstituteContainer: {
    marginBottom: 16,
  },
  customInstituteNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  customInstituteNoteText: {
    flex: 1,
    fontSize: 12,
    color: "#92400E",
    lineHeight: 16,
  },
});
