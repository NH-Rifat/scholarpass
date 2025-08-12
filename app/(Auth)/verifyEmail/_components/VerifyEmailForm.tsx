import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "../../../(Home)/styles/globalStyles";

import {
  useResendVerification,
  useVerifyEmail,
} from "@/hooks/mutations/useVerifyEmail";
import { verifyEmailData } from "../utils/data";
import {
  formatVerificationCode,
  hasValidationErrors,
  validateVerifyEmailForm,
  VerifyEmailFormData,
  VerifyEmailValidationErrors,
} from "../utils/validation";
import CodeInput from "./CodeInput";
import VerifyEmailHeader from "./VerifyEmailHeader";

const VerifyEmailForm = () => {
  const router = useRouter();
  const { email, firstName } = useLocalSearchParams<{
    email: string;
    firstName: string;
  }>();

  // TanStack Query mutations
  const verifyEmailMutation = useVerifyEmail({
    onSuccess: (data) => {
      Alert.alert("Success!", verifyEmailData.messages.success, [
        {
          text: "Continue",
          onPress: () => router.replace("/(Home)"),
        },
      ]);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || verifyEmailData.messages.invalidCode;
      setErrors({ code: errorMessage });
      setFormData((prev) => ({ ...prev, code: "" }));
    },
  });

  const resendMutation = useResendVerification({
    onSuccess: () => {
      Alert.alert("Code Sent", verifyEmailData.messages.resendSuccess);
      setErrors({});
      setFormData((prev) => ({ ...prev, code: "" }));
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || verifyEmailData.messages.resendError;
      Alert.alert("Error", errorMessage);
      setCanResend(true);
      setResendCooldown(0);
    },
  });

  const [formData, setFormData] = useState<VerifyEmailFormData>({
    code: "",
    email: email || "",
  });

  const [errors, setErrors] = useState<VerifyEmailValidationErrors>({});
  const [resendCooldown, setResendCooldown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Get loading states from mutations
  const isLoading = verifyEmailMutation.isPending;

  // Countdown timer for resend button
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleCodeChange = (code: string) => {
    const formattedCode = formatVerificationCode(code);
    setFormData((prev) => ({
      ...prev,
      code: formattedCode,
    }));

    // Clear error when user starts typing
    if (errors.code) {
      setErrors((prev) => ({
        ...prev,
        code: undefined,
      }));
    }

    // Auto-submit when 6 digits are entered
    if (formattedCode.length === verifyEmailData.timing.codeLength) {
      handleSubmit(formattedCode);
    }
  };

  const handleSubmit = async (codeOverride?: string) => {
    const codeToVerify = codeOverride || formData.code;
    const dataToValidate = { ...formData, code: codeToVerify };

    const validationErrors = validateVerifyEmailForm(dataToValidate);

    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Use TanStack Query mutation for verification
    verifyEmailMutation.mutate({
      email: formData.email,
      code: codeToVerify,
    });
  };

  const handleResendCode = async () => {
    if (!canResend || resendMutation.isPending) return;

    setCanResend(false);
    setResendCooldown(verifyEmailData.timing.resendDelay);

    // Use TanStack Query mutation for resending code
    resendMutation.mutate(formData.email);
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Logo and Title */}
        <VerifyEmailHeader
          title={verifyEmailData.title}
          subtitle={verifyEmailData.subtitle}
          email={email || ""}
        />

        {/* Form Content */}
        <View style={styles.formContainer}>
          {/* Welcome Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.welcomeText}>
              Hi {firstName || "there"}! 👋
            </Text>
            <Text style={styles.instructionText}>
              {verifyEmailData.messages.codeSent}
            </Text>
            <Text style={styles.emailText}>{email}</Text>
          </View>

          {/* Code Input */}
          <View style={styles.codeInputContainer}>
            <CodeInput
              value={formData.code}
              onChangeText={handleCodeChange}
              error={errors.code}
              codeLength={verifyEmailData.timing.codeLength}
            />
          </View>

          {/* General Error */}
          {errors.general && (
            <Text style={styles.generalErrorText}>{errors.general}</Text>
          )}

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              (isLoading ||
                formData.code.length < verifyEmailData.timing.codeLength) &&
                styles.disabledButton,
            ]}
            onPress={() => handleSubmit()}
            disabled={
              isLoading ||
              formData.code.length < verifyEmailData.timing.codeLength
            }
          >
            <Text style={styles.verifyButtonText}>
              {isLoading
                ? verifyEmailData.messages.verifying
                : verifyEmailData.messages.verify}
            </Text>
          </TouchableOpacity>

          {/* Resend Code Section */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              {verifyEmailData.messages.didntReceive}
            </Text>
            <TouchableOpacity
              style={[
                styles.resendButton,
                !canResend && styles.disabledResendButton,
              ]}
              onPress={handleResendCode}
              disabled={!canResend}
            >
              <Text
                style={[
                  styles.resendButtonText,
                  !canResend && styles.disabledResendText,
                ]}
              >
                {canResend
                  ? verifyEmailData.messages.resendCode
                  : `Resend in ${resendCooldown}s`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
            <Text style={styles.backButtonText}>← Back to Registration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Extra padding for keyboard space
  },
  formContainer: {
    padding: spacing.lg,
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  codeInputContainer: {
    // marginVertical: spacing.lg,
    // paddingVertical: spacing.md,
  },
  messageContainer: {
    alignItems: "center",
    // marginBottom: spacing.xl,
  },
  welcomeText: {
    ...typography.h3,
    color: colors.gray900,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  instructionText: {
    ...typography.body1,
    color: colors.gray600,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  emailText: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  generalErrorText: {
    ...typography.body2,
    color: colors.error,
    textAlign: "center",
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.md,
  },
  verifyButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  disabledButton: {
    opacity: 0.6,
  },
  verifyButtonText: {
    ...typography.body1,
    color: colors.white,
    fontWeight: "600",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  resendText: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing.sm,
  },
  resendButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  disabledResendButton: {
    opacity: 0.6,
  },
  resendButtonText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: "600",
  },
  disabledResendText: {
    color: colors.gray400,
  },
  backButton: {
    alignItems: "center",
    // paddingVertical: spacing.sm,
  },
  backButtonText: {
    ...typography.body2,
    color: colors.gray500,
    fontWeight: "500",
  },
});

export default VerifyEmailForm;
