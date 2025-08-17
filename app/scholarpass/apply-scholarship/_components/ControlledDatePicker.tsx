import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ControlledDatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  rules?: object;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const ControlledDatePicker: React.FC<ControlledDatePickerProps> = ({
  name,
  label,
  placeholder = "Select date",
  icon,
  rules = {},
  minimumDate,
  maximumDate,
}) => {
  const { control } = useFormContext();
  const [showPicker, setShowPicker] = useState(false);

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  // Convert string date to Date object if needed
  const dateValue = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : new Date();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      // Format date as MM/dd/yyyy
      const formattedDate = formatDate(selectedDate);
      onChange(formattedDate);
    }
  };

  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date();

    // Try to parse MM/dd/yyyy format
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[0]) - 1; // Month is 0-indexed
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      return new Date(year, month, day);
    }

    return new Date(dateString);
  };

  const displayDate = value ? value : "";

  const handlePress = () => {
    setShowPicker(true);
  };

  const handleClose = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.dateButton, error && styles.dateButtonError]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <Text
          style={[
            styles.dateButtonText,
            !displayDate && styles.placeholderText,
            ...(icon ? [styles.textWithIcon] : []),
          ]}
        >
          {displayDate || placeholder}
        </Text>

        <Feather name="calendar" size={20} color="#6B7280" />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {showPicker && (
        <DateTimePicker
          value={value ? parseDate(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          style={styles.datePicker}
        />
      )}

      {/* iOS requires a done button */}
      {showPicker && Platform.OS === "ios" && (
        <View style={styles.iosButtonContainer}>
          <TouchableOpacity
            style={styles.doneButtonContainer}
            onPress={handleClose}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 52,
  },
  dateButtonError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  iconContainer: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  textWithIcon: {
    marginLeft: 0,
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
  },
  datePicker: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  iosButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  doneButtonContainer: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area for iOS
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  cancelButton: {
    fontSize: 16,
    color: "#6B7280",
  },
  doneButton: {
    fontSize: 16,
    color: "#8B5CF6",
    fontWeight: "600",
  },
});
