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
import { ApplicationFormData, FormStepProps } from "../../utils/types";
import {
  ControlledCheckbox,
  ControlledInput,
  ControlledMultiSelect,
} from "../RHFFormComponents";

const assistanceTypes = [
  { label: "SNAP (Food Stamps)", value: "snap" },
  { label: "WIC", value: "wic" },
  { label: "Medicaid", value: "medicaid" },
  { label: "TANF", value: "tanf" },
  { label: "Housing Assistance", value: "housing" },
  { label: "Free/Reduced Lunch", value: "lunch" },
  { label: "Other", value: "other" },
];

export const FinancialInformationStep: React.FC<FormStepProps> = ({
  nextStep,
  prevStep,
}) => {
  const { trigger, watch } = useFormContext<ApplicationFormData>();

  const receivingAssistance = watch(
    "financialInformation.receivingGovernmentAssistance"
  );

  const handleNext = async () => {
    // Validate only financial information fields
    const stepFields = [
      "financialInformation.totalHouseholdIncome",
      "financialInformation.numberOfPeopleInHousehold",
      "financialInformation.receivingGovernmentAssistance",
      ...(receivingAssistance ? ["financialInformation.assistanceTypes"] : []),
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
            <MaterialIcons name="account-balance" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.title}>Financial Information</Text>
          <Text style={styles.subtitle}>
            This information helps us determine your financial need and match
            you with the most suitable scholarship opportunities.
          </Text>
        </View>

        <View style={styles.form}>
          <ControlledInput
            name="financialInformation.totalHouseholdIncome"
            label="Total Annual Household Income"
            placeholder="Enter total household income"
            keyboardType="numeric"
            icon={
              <MaterialIcons name="attach-money" size={18} color="#6B7280" />
            }
          />

          <Text style={styles.helpText}>
            Include all sources of income for all household members before taxes
          </Text>

          <ControlledInput
            name="financialInformation.numberOfPeopleInHousehold"
            label="Number of People in Household"
            placeholder="Enter number of people"
            keyboardType="numeric"
            icon={<Feather name="users" size={18} color="#6B7280" />}
          />

          <Text style={styles.helpText}>
            Include all family members living in your household
          </Text>

          <View style={styles.assistanceSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="help-outline" size={16} color="#8B5CF6" />{" "}
              Government Assistance
            </Text>

            <ControlledCheckbox
              name="financialInformation.receivingGovernmentAssistance"
              label="Our family currently receives government assistance"
            />

            {receivingAssistance && (
              <View style={styles.assistanceTypesContainer}>
                <ControlledMultiSelect
                  name="financialInformation.assistanceTypes"
                  label="Types of Government Assistance (Select all that apply)"
                  options={assistanceTypes}
                />
              </View>
            )}
          </View>

          <View style={styles.privacyNote}>
            <View style={styles.privacyIcon}>
              <MaterialIcons name="lock" size={20} color="#10B981" />
            </View>
            <View style={styles.privacyContent}>
              <Text style={styles.privacyTitle}>Privacy Protection</Text>
              <Text style={styles.privacyText}>
                All financial information is kept strictly confidential and used
                only for scholarship matching purposes. Your data is encrypted
                and secured.
              </Text>
            </View>
          </View>

          <View style={styles.eligibilityNote}>
            <View style={styles.eligibilityIcon}>
              <MaterialIcons name="info" size={20} color="#F59E0B" />
            </View>
            <View style={styles.eligibilityContent}>
              <Text style={styles.eligibilityTitle}>
                Financial Need Assessment
              </Text>
              <Text style={styles.eligibilityText}>
                Scholarships have different income requirements. Higher income
                doesn't disqualify you - many merit-based scholarships are
                available regardless of financial need.
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
  helpText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: -15,
    marginBottom: 15,
    fontStyle: "italic",
  },
  assistanceSection: {
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
    marginBottom: 16,
  },
  assistanceTypesContainer: {
    marginTop: 16,
  },
  privacyNote: {
    flexDirection: "row",
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  privacyIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 4,
  },
  privacyText: {
    fontSize: 13,
    color: "#047857",
    lineHeight: 18,
  },
  eligibilityNote: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  eligibilityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  eligibilityContent: {
    flex: 1,
  },
  eligibilityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  eligibilityText: {
    fontSize: 13,
    color: "#D97706",
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
    backgroundColor: "#F3F4F6",
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
