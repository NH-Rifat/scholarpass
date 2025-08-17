import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ControlledInputProps {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  icon?: React.ReactNode;
  rules?: object;
}

export const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  label,
  placeholder,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  icon,
  rules = {},
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            icon ? styles.inputWithIcon : undefined,
            multiline && styles.multilineInput,
          ]}
          value={value || ""}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor="#9CA3AF"
        />
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

interface ControlledSelectProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
  rules?: object;
}

export const ControlledSelect: React.FC<ControlledSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  icon,
  rules = {},
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          styles.selectWrapper,
          error && styles.inputError,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Picker
          selectedValue={value || ""}
          onValueChange={onChange}
          style={[styles.picker, icon ? styles.pickerWithIcon : undefined]}
        >
          <Picker.Item label={placeholder} value="" color="#9CA3AF" />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              color="#1F2937"
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

interface ControlledCheckboxProps {
  name: string;
  label: string;
  rules?: object;
}

export const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
  name,
  label,
  rules = {},
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        style={styles.checkboxButton}
        onPress={() => onChange(!value)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, value && styles.checkboxSelected]}>
          {value && <Text style={styles.checkboxCheck}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

interface ControlledMultiSelectProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  rules?: object;
}

export const ControlledMultiSelect: React.FC<ControlledMultiSelectProps> = ({
  name,
  label,
  options,
  rules = {},
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const selectedValues = value || [];

  const toggleOption = (optionValue: string) => {
    const isSelected = selectedValues.includes(optionValue);
    let newValues;

    if (isSelected) {
      newValues = selectedValues.filter((v: string) => v !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }

    onChange(newValues);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.multiSelectContainer}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.multiSelectOption,
                isSelected && styles.multiSelectOptionSelected,
              ]}
              onPress={() => toggleOption(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.multiSelectOptionText,
                  isSelected && styles.multiSelectOptionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    minHeight: 52,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  iconContainer: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 0,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  multilineInput: {
    paddingVertical: 12,
    textAlignVertical: "top",
  },
  selectWrapper: {
    paddingHorizontal: 8,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#1F2937",
  },
  pickerWithIcon: {
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
  },
  checkboxContainer: {
    marginBottom: 16,
  },
  checkboxButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  checkboxCheck: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#4B5563",
  },
  multiSelectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  multiSelectOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  multiSelectOptionSelected: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  multiSelectOptionText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  multiSelectOptionTextSelected: {
    color: "#FFFFFF",
  },
});
