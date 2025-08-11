import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { borderRadius, colors, spacing, typography } from '../../../(Home)/styles/globalStyles';

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  countryCode?: string;
  countryFlag?: string;
  onCountrySelect?: (country: any) => void;
}

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  countryCode,
  countryFlag,
  onCountrySelect
}: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPhoneInput = keyboardType === 'phone-pad' && countryCode;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedInputContainer,
        error && styles.errorInputContainer
      ]}>
        {isPhoneInput && (
          <TouchableOpacity 
            style={styles.countryCodeContainer}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.flagText}>{countryFlag}</Text>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.input, isPhoneInput && styles.phoneInput]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray400}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Text style={styles.eyeIconText}>
              {isPasswordVisible ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}
        {label.includes('Email') && (
          <View style={styles.emailIcon}>
            <Text style={styles.emailIconText}>✉️</Text>
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {/* Country Picker Modal */}
      {isPhoneInput && (
        <CountryPicker
          show={showCountryPicker}
          lang="en"
          pickerButtonOnPress={(item) => {
            onCountrySelect?.(item);
            setShowCountryPicker(false);
          }}
          onBackdropPress={() => setShowCountryPicker(false)}
          style={{
            modal: {
              height: 500,
            },
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body2,
    color: colors.gray700,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  focusedInputContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  errorInputContainer: {
    borderColor: colors.error,
    backgroundColor: colors.gray50,
  },
  input: {
    flex: 1,
    ...typography.body1,
    color: colors.gray800,
    paddingVertical: spacing.sm,
  },
  phoneInput: {
    paddingLeft: spacing.xs,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.sm,
    paddingLeft: spacing.xs,
  },
  flagText: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  countryCodeText: {
    ...typography.body1,
    color: colors.gray700,
    fontWeight: '500',
    marginRight: spacing.xs,
  },
  dropdownArrow: {
    fontSize: 10,
    color: colors.gray500,
    marginRight: spacing.sm,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: colors.gray300,
    marginLeft: spacing.sm,
  },
  eyeIcon: {
    padding: spacing.xs,
  },
  eyeIconText: {
    fontSize: 16,
  },
  emailIcon: {
    padding: spacing.xs,
  },
  emailIconText: {
    fontSize: 16,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default FormInput;
