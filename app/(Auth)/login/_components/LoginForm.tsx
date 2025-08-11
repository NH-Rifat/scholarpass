import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../../(Home)/styles/globalStyles';
import FormInput from '../../register/_components/FormInput';
import { loginFormData } from '../utils/data';
import { LoginFormData, LoginValidationErrors, hasLoginValidationErrors, validateLoginForm } from '../utils/validation';
import LoginHeader from './LoginHeader';

const LoginForm = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
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
    const validationErrors = validateLoginForm(formData);
    
    if (hasLoginValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'You have been logged in successfully.',
        [
          {
            text: 'Continue',
            onPress: () => router.push('/(Home)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToForgotPassword = () => {
    // router.push('/forget');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Logo and Title */}
      <LoginHeader
        title={loginFormData.title}
        subtitle={loginFormData.subtitle}
      />

      {/* Form Content */}
      <View style={styles.formContainer}>
        {/* Email Field */}
        <FormInput
          label={loginFormData.formFields.email.label}
          placeholder={loginFormData.formFields.email.placeholder}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Field */}
        <FormInput
          label={loginFormData.formFields.password.label}
          placeholder={loginFormData.formFields.password.placeholder}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Forgot Password Link */}
        <TouchableOpacity style={styles.forgotPasswordLink} onPress={navigateToForgotPassword}>
          <Text style={styles.forgotPasswordText}>
            {loginFormData.buttons.forgotPassword}
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : loginFormData.buttons.login}
          </Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity style={styles.registerLink} onPress={navigateToRegister}>
          <Text style={styles.registerLinkText}>
            {loginFormData.buttons.dontHaveAccount}
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
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '500',
  },
  loginButton: {
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
  loginButtonText: {
    ...typography.body1,
    color: colors.white,
    fontWeight: '600',
  },
  registerLink: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  registerLinkText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '500',
  },
});

export default LoginForm;
