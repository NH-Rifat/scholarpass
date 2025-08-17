import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { relationships } from "../../utils/data";
import { ApplicationFormData, FormStepProps } from "../../utils/types";
import { ControlledPhoneInput } from "../ControlledPhoneInput";
import { ControlledInput, ControlledSelect } from "../RHFFormComponents";

export const GuardianInformationStep: React.FC<FormStepProps> = ({
  nextStep,
  prevStep,
}) => {
  const { trigger } = useFormContext<ApplicationFormData>();

  const handleNext = async () => {
    // Validate only guardian information fields
    const stepFields = [
      "guardianInformation.guardianFirstName",
      "guardianInformation.guardianLastName",
      "guardianInformation.jobTitle",
      "guardianInformation.relationshipToStudent",
      "guardianInformation.guardianEmail",
      "guardianInformation.phoneNumber",
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
            <Feather name="users" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.title}>Guardian Information</Text>
          <Text style={styles.subtitle}>
            Please provide information about the primary parent or guardian who
            will be responsible for the student's scholarship application and
            communications.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <ControlledInput
                name="guardianInformation.guardianFirstName"
                label="Guardian First Name"
                placeholder="Enter first name"
                icon={<Feather name="user" size={18} color="#6B7280" />}
              />
            </View>
            <View style={styles.halfWidth}>
              <ControlledInput
                name="guardianInformation.guardianLastName"
                label="Guardian Last Name"
                placeholder="Enter last name"
                icon={<Feather name="user" size={18} color="#6B7280" />}
              />
            </View>
          </View>

          <ControlledInput
            name="guardianInformation.jobTitle"
            label="Job Title"
            placeholder="Enter job title"
            icon={<Feather name="briefcase" size={18} color="#6B7280" />}
          />

          <ControlledSelect
            name="guardianInformation.relationshipToStudent"
            label="Relationship to Student"
            options={relationships}
            placeholder="Select relationship"
          />

          <ControlledInput
            name="guardianInformation.guardianEmail"
            label="Email Address"
            placeholder="guardian@example.com"
            keyboardType="email-address"
            icon={<MaterialIcons name="email" size={18} color="#6B7280" />}
          />
          <Text style={styles.helpText}>
            This email will be used for all communications regarding the
            scholarship
          </Text>

          <ControlledPhoneInput
            name="guardianInformation.phoneNumber"
            label="Phone Number"
            placeholder="123-456-7890"
            icon={<Feather name="phone" size={18} color="#6B7280" />}
          />

          <View style={styles.noteContainer}>
            <View style={styles.noteIcon}>
              <Feather name="info" size={20} color="#F59E0B" />
            </View>
            <View style={styles.noteContent}>
              <Text style={styles.noteTitle}>Important Note</Text>
              <Text style={styles.noteText}>
                The guardian listed above will have access to the student's
                scholarship information and will be the primary contact for all
                communications. Please ensure all information is accurate.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Feather name="arrow-left" size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

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
  helpText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: -12,
    marginBottom: 16,
    fontStyle: "italic",
  },
  noteContainer: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    marginTop: 20,
  },
  noteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
    color: "#92400E",
    lineHeight: 18,
  },
  buttonContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  backButtonText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#8B5CF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    flex: 1,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
