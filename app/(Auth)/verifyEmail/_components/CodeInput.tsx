import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import {
  borderRadius,
  colors,
  spacing,
  typography,
} from "../../../(Home)/styles/globalStyles";

const { width: screenWidth } = Dimensions.get("window");

// Calculate responsive input width
const getInputWidth = () => {
  const totalPadding = spacing.lg * 2; // Left and right padding of form container
  const totalMargins = spacing.xs * 6; // Margins between inputs (6 inputs)
  const availableWidth = screenWidth - totalPadding - totalMargins;
  const calculatedWidth = Math.floor(availableWidth / 6);

  // Ensure minimum and maximum width constraints
  return Math.max(40, Math.min(60, calculatedWidth));
};

interface CodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  codeLength?: number;
}

const CodeInput = ({
  value,
  onChangeText,
  error,
  codeLength = 6,
}: CodeInputProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, codeLength);
  }, [codeLength]);

  const handleInputChange = (text: string, index: number) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    // If multiple digits are pasted, handle them
    if (numericText.length > 1) {
      const newCode = numericText.slice(0, codeLength);
      onChangeText(newCode);

      // Focus on the last filled input or the next empty one
      const nextIndex = Math.min(newCode.length, codeLength - 1);
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 10);
      return;
    }

    // Handle single digit input
    const currentCode = value.split("");

    if (numericText === "") {
      // Backspace pressed
      currentCode[index] = "";
      onChangeText(currentCode.join(""));

      // Focus previous input
      if (index > 0) {
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 10);
      }
    } else {
      // Single digit entered
      currentCode[index] = numericText;
      onChangeText(currentCode.join(""));

      // Focus next input
      if (index < codeLength - 1) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && value[index] === "" && index > 0) {
      // If current input is empty and backspace is pressed, focus previous
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 10);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter 6-digit verification code</Text>

      <View style={styles.inputContainer}>
        {Array.from({ length: codeLength }, (_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.digitInput,
              focusedIndex === index && styles.focusedInput,
              error && styles.errorInput,
              value[index] && styles.filledInput,
            ]}
            value={value[index] || ""}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            maxLength={codeLength} // Allow pasting multiple digits
            keyboardType="numeric"
            textAlign="center"
            selectTextOnFocus
            autoCapitalize="none"
            autoCorrect={false}
            contextMenuHidden={false}
          />
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.helperText}>
        You can paste the code from your email or enter digits one by one
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body1,
    color: colors.gray700,
    fontWeight: "600",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "nowrap",
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.xs,
  },
  digitInput: {
    width: getInputWidth(),
    height: getInputWidth() + 4, // Slightly taller than wide for better proportion
    marginHorizontal: spacing.xs / 2,
    borderWidth: 2,
    borderColor: colors.gray300,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    fontSize: Math.min(24, getInputWidth() * 0.4), // Responsive font size
    color: colors.gray900,
    fontWeight: "600",
    textAlign: "center",
  },
  focusedInput: {
    borderColor: colors.primary,
    backgroundColor: colors.blue50,
  },
  filledInput: {
    borderColor: colors.primary,
    backgroundColor: colors.blue50,
  },
  errorInput: {
    borderColor: colors.error,
    backgroundColor: colors.gray50,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  helperText: {
    ...typography.caption,
    color: colors.gray500,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default CodeInput;
