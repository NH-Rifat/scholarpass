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
import { ControlledInput } from "../RHFFormComponents";

export const ApplicationEssayStep: React.FC<FormStepProps> = ({
  nextStep,
  prevStep,
  isLastStep = false,
  onSubmit,
}) => {
  const { trigger, watch } = useFormContext<ApplicationFormData>();

  const essay = watch("applicationEssay.essay");
  const wordCount = essay ? essay.trim().split(/\s+/).length : 0;

  const handleNext = async () => {
    // Validate essay field
    const stepFields = ["applicationEssay.essay"];

    const isValid = await trigger(stepFields as any);

    if (isValid) {
      if (isLastStep && onSubmit) {
        onSubmit();
      } else {
        nextStep();
      }
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
            <Feather name="edit-3" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.title}>Application Essay</Text>
          <Text style={styles.subtitle}>
            Tell us about yourself, your goals, and why you deserve this
            scholarship opportunity.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.essaySection}>
            <Text style={styles.sectionTitle}>
              <Feather name="file-text" size={16} color="#8B5CF6" /> Personal
              Statement
            </Text>
            <Text style={styles.sectionSubtitle}>
              Write a compelling essay that showcases your personality,
              achievements, and aspirations. This is your chance to stand out!
            </Text>

            <ControlledInput
              name="applicationEssay.essay"
              label="Your Essay"
              placeholder="Begin writing your personal statement here. Share your story, challenges you've overcome, goals you're pursuing, and how this scholarship will help you achieve them. Be authentic and let your personality shine through your words..."
              multiline
              numberOfLines={12}
            />

            <View style={styles.wordCountContainer}>
              <Text
                style={[
                  styles.wordCount,
                  wordCount > 500
                    ? styles.wordCountGood
                    : styles.wordCountNormal,
                ]}
              >
                {wordCount} words
              </Text>
              <Text style={styles.wordCountHint}>
                Recommended: 300-800 words
              </Text>
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>
              <MaterialIcons
                name="tips-and-updates"
                size={16}
                color="#F59E0B"
              />{" "}
              Essay Writing Tips
            </Text>

            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Be authentic:</Text> Share your
                real experiences and genuine motivations
              </Text>
            </View>

            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Show don't tell:</Text> Use
                specific examples to demonstrate your qualities
              </Text>
            </View>

            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Focus on impact:</Text> Explain how
                you'll use this opportunity to make a difference
              </Text>
            </View>

            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Proofread carefully:</Text> Check
                for grammar, spelling, and clarity
              </Text>
            </View>
          </View>

          <View style={styles.promptsSection}>
            <Text style={styles.promptsTitle}>
              <Feather name="help-circle" size={16} color="#3B82F6" /> Essay
              Prompts to Consider
            </Text>

            <View style={styles.promptItem}>
              <Text style={styles.promptText}>
                • What challenges have you overcome to get to where you are
                today?
              </Text>
            </View>

            <View style={styles.promptItem}>
              <Text style={styles.promptText}>
                • What are your educational and career goals, and how will this
                scholarship help you achieve them?
              </Text>
            </View>

            <View style={styles.promptItem}>
              <Text style={styles.promptText}>
                • How do you plan to give back to your community with your
                education?
              </Text>
            </View>

            <View style={styles.promptItem}>
              <Text style={styles.promptText}>
                • What unique perspective or experience do you bring?
              </Text>
            </View>
          </View>

          <View style={styles.finalNote}>
            <View style={styles.finalNoteIcon}>
              <MaterialIcons name="celebration" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.finalNoteContent}>
              <Text style={styles.finalNoteTitle}>You're Almost Done!</Text>
              <Text style={styles.finalNoteText}>
                This is the final step of your scholarship application. Take
                your time to craft a thoughtful essay that represents who you
                are and your aspirations. Good luck!
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

        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <Text style={styles.submitButtonText}>
            {isLastStep ? "Submit Application" : "Next Step"}
          </Text>
          <MaterialIcons
            name={isLastStep ? "send" : "arrow-forward"}
            size={20}
            color="#FFFFFF"
          />
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
  essaySection: {
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
    lineHeight: 20,
  },
  wordCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  wordCount: {
    fontSize: 14,
    fontWeight: "600",
  },
  wordCountNormal: {
    color: "#6B7280",
  },
  wordCountGood: {
    color: "#10B981",
  },
  wordCountHint: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  tipsSection: {
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#D97706",
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: "600",
  },
  promptsSection: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  promptsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 12,
  },
  promptItem: {
    marginBottom: 8,
  },
  promptText: {
    fontSize: 14,
    color: "#1D4ED8",
    lineHeight: 20,
  },
  finalNote: {
    flexDirection: "row",
    backgroundColor: "#F5F3FF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8B4FE",
  },
  finalNoteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  finalNoteContent: {
    flex: 1,
  },
  finalNoteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7C3AED",
    marginBottom: 4,
  },
  finalNoteText: {
    fontSize: 14,
    color: "#8B5CF6",
    lineHeight: 20,
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
  submitButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    flex: 1,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
