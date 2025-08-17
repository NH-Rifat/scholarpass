import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StepperProps } from "../utils/types";

export const ProgressStepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  const renderStepIndicators = () => {
    const indicators = [];

    for (let i = 1; i <= totalSteps; i++) {
      const isCompleted = i < currentStep;
      const isCurrent = i === currentStep;
      const isUpcoming = i > currentStep;

      indicators.push(
        <View key={i} style={styles.stepIndicatorContainer}>
          {/* Step Circle */}
          <View
            style={[
              styles.stepCircle,
              isCompleted && styles.stepCircleCompleted,
              isCurrent && styles.stepCircleCurrent,
              isUpcoming && styles.stepCircleUpcoming,
            ]}
          >
            {isCompleted ? (
              <Feather name="check" size={14} color="#FFFFFF" />
            ) : isCurrent ? (
              <Text style={styles.stepNumber}>{i}</Text>
            ) : (
              <Text style={[styles.stepNumber, styles.stepNumberUpcoming]}>
                {i}
              </Text>
            )}
          </View>

          {/* Step Label */}
          <Text
            style={[
              styles.stepLabel,
              isCompleted && styles.stepLabelCompleted,
              isCurrent && styles.stepLabelCurrent,
              isUpcoming && styles.stepLabelUpcoming,
            ]}
          >
            {stepTitles[i - 1]}
          </Text>

          {/* Connector Line */}
          {i < totalSteps && (
            <View
              style={[
                styles.connector,
                i < currentStep && styles.connectorCompleted,
              ]}
            />
          )}
        </View>
      );
    }

    return indicators;
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <View style={styles.container}>
      {/* Enhanced Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
          {/* Progress glow effect */}
          <View
            style={[styles.progressGlow, { width: `${progressPercentage}%` }]}
          />
        </View>

        {/* Progress percentage text */}
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>
            {Math.round(progressPercentage)}% Complete
          </Text>
        </View>
      </View>

      {/* Step Indicators */}
      <View style={styles.stepsContainer}>{renderStepIndicators()}</View>

      {/* Current Step Info */}
      <View style={styles.currentStepContainer}>
        <View style={styles.currentStepHeader}>
          <MaterialIcons name="play-circle-filled" size={20} color="#8B5CF6" />
          <Text style={styles.currentStepTitle}>
            {stepTitles[currentStep - 1]}
          </Text>
        </View>
        <View style={styles.stepCounterContainer}>
          <Text style={styles.stepCounter}>
            Step {currentStep} of {totalSteps}
          </Text>
          <View style={styles.completionBadge}>
            <Feather name="clock" size={12} color="#6B7280" />
            <Text style={styles.completionText}>
              {currentStep === totalSteps ? "Final Step" : "In Progress"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  // Enhanced Progress Bar
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
    borderRadius: 4,
    position: "relative",
  },
  progressGlow: {
    height: "100%",
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    borderRadius: 4,
    position: "absolute",
    top: 0,
    left: 0,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressTextContainer: {
    alignItems: "flex-end",
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8B5CF6",
  },

  // Step Indicators
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stepIndicatorContainer: {
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
  },
  stepCircleCompleted: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  stepCircleCurrent: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepCircleUpcoming: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  stepNumberUpcoming: {
    color: "#6B7280",
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 12,
    maxWidth: 60,
  },
  stepLabelCompleted: {
    color: "#10B981",
  },
  stepLabelCurrent: {
    color: "#8B5CF6",
    fontWeight: "600",
  },
  stepLabelUpcoming: {
    color: "#9CA3AF",
  },
  connector: {
    position: "absolute",
    top: 15,
    left: "50%",
    width: "100%",
    height: 2,
    backgroundColor: "#E5E7EB",
    zIndex: -1,
  },
  connectorCompleted: {
    backgroundColor: "#10B981",
  },

  // Current Step Info
  currentStepContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  currentStepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  currentStepTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
  },
  stepCounterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepCounter: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  completionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  completionText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#64748B",
  },
});
