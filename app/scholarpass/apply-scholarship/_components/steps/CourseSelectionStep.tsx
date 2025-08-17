import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFormContext } from "react-hook-form";
import { courses, scholarshipPrograms } from "../../utils/data";
import { FormStepProps, ApplicationFormData } from "../../utils/types";
import { ControlledSelect, ControlledMultiSelect } from "../RHFFormComponents";

export const CourseSelectionStep: React.FC<FormStepProps> = ({
  nextStep,
  prevStep,
}) => {
  const { trigger } = useFormContext<ApplicationFormData>();

  const handleNext = async () => {
    // Validate only course selection fields
    const stepFields = [
      'courseSelection.selectedCourse',
      'courseSelection.selectedScholarships',
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
            <MaterialIcons name="school" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.title}>Course & Scholarship Selection</Text>
          <Text style={styles.subtitle}>
            Select your desired course of study and the scholarships you'd like
            to apply for.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.courseSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="menu-book" size={16} color="#8B5CF6" />{" "}
              Course Selection
            </Text>
            <Text style={styles.sectionSubtitle}>
              Choose the course or field of study you plan to pursue
            </Text>

            <ControlledSelect
              name="courseSelection.selectedCourse"
              label="Select Your Course"
              options={courses.map(course => ({ label: course.title, value: course.id }))}
              placeholder="Choose your course of study"
            />

            <View style={styles.infoBox}>
              <MaterialIcons name="lightbulb" size={16} color="#F59E0B" />
              <Text style={styles.infoText}>
                Don't see your course? Select the closest related field, and we'll
                help match you with relevant scholarships.
              </Text>
            </View>
          </View>

          <View style={styles.scholarshipSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="emoji-events" size={16} color="#8B5CF6" />{" "}
              Scholarship Programs
            </Text>
            <Text style={styles.sectionSubtitle}>
              Select the scholarship programs you're interested in applying for
              (you can choose multiple)
            </Text>

            <ControlledMultiSelect
              name="courseSelection.selectedScholarships"
              label="Available Scholarship Programs"
              options={scholarshipPrograms.map(program => ({ label: program.title, value: program.id }))}
            />

            <View style={styles.scholarshipNote}>
              <View style={styles.noteIcon}>
                <MaterialIcons name="info" size={20} color="#3B82F6" />
              </View>
              <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>Scholarship Matching</Text>
                <Text style={styles.noteText}>
                  Based on your profile and selections, we'll recommend the best
                  scholarship matches for you. You can apply to multiple programs
                  to increase your chances of success.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Application Summary</Text>
            <View style={styles.summaryItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.summaryText}>
                Your course selection will be used to match you with relevant
                scholarships
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.summaryText}>
                Multiple scholarship applications increase your success chances
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <MaterialIcons name="check-circle" size={16} color="#10B981" />
              <Text style={styles.summaryText}>
                We'll guide you through each application process
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
  courseSection: {
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
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#D97706",
    lineHeight: 18,
  },
  scholarshipSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  scholarshipNote: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
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
    color: "#1E40AF",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 13,
    color: "#1D4ED8",
    lineHeight: 18,
  },
  summarySection: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#15803D",
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  summaryText: {
    flex: 1,
    fontSize: 14,
    color: "#166534",
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
