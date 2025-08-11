import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../../(Home)/styles/globalStyles';

interface RegisterHeaderProps {
  title: string;
  subtitle: string;
}

const RegisterHeader = ({ title, subtitle }: RegisterHeaderProps) => {
  return (
    <LinearGradient
      colors={['#2563EB', '#7C3AED', '#F59E0B']} // from-blue-600 via-purple-600 to-orange-500
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../../assets/images/logo/main_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body1,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default RegisterHeader;
