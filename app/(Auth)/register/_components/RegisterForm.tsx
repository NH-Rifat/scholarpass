import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../../(Home)/styles/globalStyles';
import { registerFormData } from '../utils/data';
import { FormData, hasValidationErrors, validateForm, ValidationErrors } from '../utils/validation';
import FormInput from './FormInput';
import RegisterHeader from './RegisterHeader';
import RoleSelection from './RoleSelection';

const RegisterForm = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    role: '',
    agreeToTerms: false,
  });

  const [selectedCountry, setSelectedCountry] = useState({
    code: '+1',
    name: 'United States',
    flag: '🇺🇸',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your account has been created successfully.',
        [
          {
            text: 'Login',
            onPress: () => router.push('/(Auth)/login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Logo and Title */}
      <RegisterHeader
        title={registerFormData.title}
        subtitle={registerFormData.subtitle}
      />

      {/* Form Content */}
      <View style={styles.formContainer}>
        {/* Name Fields */}
        <View style={styles.nameContainer}>
          <View style={styles.nameField}>
            <FormInput
              label={registerFormData.formFields.firstName.label}
              placeholder={registerFormData.formFields.firstName.placeholder}
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              error={errors.firstName}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.nameField}>
            <FormInput
              label={registerFormData.formFields.lastName.label}
              placeholder={registerFormData.formFields.lastName.placeholder}
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              error={errors.lastName}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Email Field */}
        <FormInput
          label={registerFormData.formFields.email.label}
          placeholder={registerFormData.formFields.email.placeholder}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Mobile Number Field */}
        <FormInput
          label={registerFormData.formFields.mobileNumber.label}
          placeholder={registerFormData.formFields.mobileNumber.placeholder}
          value={formData.mobileNumber}
          onChangeText={(text) => handleInputChange('mobileNumber', text)}
          error={errors.mobileNumber}
          keyboardType="phone-pad"
          countryCode={selectedCountry.code}
          countryFlag={selectedCountry.flag}
          onCountrySelect={(country) => {
            setSelectedCountry({
              code: country.dial_code,
              name: country.name.en,
              flag: country.flag,
            });
          }}
        />

        {/* Password Field */}
        <FormInput
          label={registerFormData.formFields.password.label}
          placeholder={registerFormData.formFields.password.placeholder}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Role Selection */}
        <RoleSelection
          roles={registerFormData.roles}
          selectedRole={formData.role}
          onRoleSelect={(roleId) => handleInputChange('role', roleId)}
        />
        {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

        {/* Terms and Conditions */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
        >
          <View style={[styles.checkbox, formData.agreeToTerms && styles.checkedCheckbox]}>
            {formData.agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            {registerFormData.legal.termsText}
          </Text>
        </TouchableOpacity>
        {errors.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms}</Text>}

        {/* Create Account Button */}
        <TouchableOpacity
          style={[styles.createButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.createButtonText}>
            {isLoading ? 'Creating Account...' : registerFormData.buttons.createAccount}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity style={styles.loginLink} onPress={navigateToLogin}>
          <Text style={styles.loginLinkText}>
            {registerFormData.buttons.alreadyRegistered}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  formContainer: {
    padding: spacing.lg,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  nameField: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.gray300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkedCheckbox: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    ...typography.body2,
    color: colors.gray600,
    lineHeight: 20,
    flex: 1,
  },
  createButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  disabledButton: {
    opacity: 0.6,
  },
  createButtonText: {
    ...typography.body1,
    color: colors.white,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  loginLinkText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '500',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.sm,
  },
});

export default RegisterForm;
