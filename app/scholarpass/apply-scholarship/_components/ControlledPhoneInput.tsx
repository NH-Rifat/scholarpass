import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

interface ControlledPhoneInputProps {
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const ControlledPhoneInput: React.FC<ControlledPhoneInputProps> = ({
  name,
  label,
  placeholder = "Enter phone number",
  icon,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // State for selected country
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
  });

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: `${label} is required` },
  });

  const handleCountrySelect = (country: any) => {
    setSelectedCountry({
      code: country.dial_code,
      name: country.name.en,
      flag: country.flag,
    });
    setShowCountryPicker(false);

    // Update the field value to include the new country code
    if (field.value) {
      // Remove any existing country code from the phone number
      const phoneWithoutCode = field.value.replace(/^\+\d{1,4}/, "");
      field.onChange(`${country.dial_code}${phoneWithoutCode}`);
    }
  };

  const handlePhoneChange = (phoneNumber: string) => {
    // Always include the country code in the stored value
    const fullPhoneNumber = phoneNumber.startsWith(selectedCountry.code)
      ? phoneNumber
      : `${selectedCountry.code}${phoneNumber}`;
    field.onChange(fullPhoneNumber);
  };

  // Extract phone number without country code for display
  const getDisplayPhoneNumber = () => {
    if (!field.value) return "";

    // Remove the country code from the display
    const phoneWithoutCode = field.value.replace(selectedCountry.code, "");
    return phoneWithoutCode;
  };

  // Update selected country when field value changes (for initial load)
  React.useEffect(() => {
    if (field.value && field.value.startsWith("+")) {
      // Try to extract country code from the phone number
      const matches = field.value.match(/^(\+\d{1,4})/);
      if (matches && matches[1] !== selectedCountry.code) {
        // This is a simplified approach - in a real app you'd want to match against a country list
        const extractedCode = matches[1];
        // For now, we'll just update if it's a common country code
        const countryMapping: { [key: string]: any } = {
          "+1": { code: "+1", name: "United States", flag: "🇺🇸" },
          "+44": { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
          "+33": { code: "+33", name: "France", flag: "🇫🇷" },
          "+49": { code: "+49", name: "Germany", flag: "🇩🇪" },
          "+91": { code: "+91", name: "India", flag: "🇮🇳" },
          "+86": { code: "+86", name: "China", flag: "🇨🇳" },
          "+81": { code: "+81", name: "Japan", flag: "🇯🇵" },
        };

        if (countryMapping[extractedCode]) {
          setSelectedCountry(countryMapping[extractedCode]);
        }
      }
    }
  }, [field.value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInputContainer,
          error && styles.errorInputContainer,
          disabled && styles.disabledInputContainer,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        {/* Country Code Selector */}
        <TouchableOpacity
          style={styles.countryCodeContainer}
          onPress={() => !disabled && setShowCountryPicker(true)}
          disabled={disabled}
        >
          <Text style={styles.flagText}>{selectedCountry.flag}</Text>
          <Text
            style={[styles.countryCodeText, disabled && styles.disabledText]}
          >
            {selectedCountry.code}
          </Text>
          <Text style={[styles.dropdownArrow, disabled && styles.disabledText]}>
            ▼
          </Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Phone Number Input */}
        <TextInput
          style={[styles.input, disabled && styles.disabledText]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={getDisplayPhoneNumber()}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            field.onBlur();
          }}
          editable={!disabled}
        />
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {/* Country Picker Modal */}
      <CountryPicker
        show={showCountryPicker}
        lang="en"
        pickerButtonOnPress={handleCountrySelect}
        onBackdropPress={() => setShowCountryPicker(false)}
        style={{
          modal: {
            height: 500,
          },
          dialCode: {
            color: "#1F2937",
          },
          countryName: {
            color: "#1F2937",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  inputContainer: {
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
  focusedInputContainer: {
    borderColor: "#8B5CF6",
    backgroundColor: "#FEFEFE",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorInputContainer: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  disabledInputContainer: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  iconContainer: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  flagText: {
    fontSize: 18,
    marginRight: 4,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
    marginRight: 4,
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#6B7280",
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "#D1D5DB",
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 0,
  },
  disabledText: {
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
  },
});
