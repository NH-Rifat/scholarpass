import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, globalStyles, spacing, typography } from '../../styles/globalStyles';
import { callToActionData } from '../../utils/data';

const CallToAction = () => {
  return (
    <View style={styles.container}>
      <View style={globalStyles.section}>
        <Text style={styles.title}>{callToActionData.title}</Text>
        <Text style={styles.subtitle}>{callToActionData.subtitle}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[globalStyles.button, styles.primaryButton]}>
            <Text style={[globalStyles.buttonText, styles.primaryButtonText]}>
              {callToActionData.buttons[0].text}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[globalStyles.button, styles.secondaryButton]}>
            <Text style={[globalStyles.buttonText, styles.secondaryButtonText]}>
              {callToActionData.buttons[1].text}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[globalStyles.button, styles.tertiaryButton]}>
            <Text style={[globalStyles.buttonText, styles.tertiaryButtonText]}>
              {callToActionData.buttons[2].text}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Students Helped</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Partner Institutes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$2M+</Text>
            <Text style={styles.statLabel}>Scholarships Awarded</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  title: {
    ...typography.h2,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.blue100,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  primaryButton: {
    backgroundColor: colors.white,
    width: '100%',
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    color: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    width: '100%',
    marginBottom: spacing.md,
  },
  secondaryButtonText: {
    color: colors.white,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.blue100,
    width: '100%',
  },
  tertiaryButtonText: {
    color: colors.blue100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 100,
    marginVertical: spacing.sm,
  },
  statNumber: {
    ...typography.h3,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.blue100,
    textAlign: 'center',
  },
});

export default CallToAction;
