import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, globalStyles, shadows, spacing, typography } from '../../styles/globalStyles';
import { howItWorksSteps } from '../../utils/data';

const HowItWorks = () => {
  const renderStep = ({ item, index }: { item: typeof howItWorksSteps[0]; index: number }) => (
    <View style={styles.stepContainer}>
      <View style={styles.stepCard}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{item.step}</Text>
        </View>
        
        <View style={styles.stepContent}>
          <Text style={styles.stepIcon}>{item.icon}</Text>
          <Text style={styles.stepTitle}>{item.title}</Text>
          <Text style={styles.stepDescription}>{item.description}</Text>
        </View>
      </View>
      
      {/* Connection line to next step */}
      {index < howItWorksSteps.length - 1 && (
        <View style={styles.connectionLine} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={globalStyles.section}>
        <Text style={styles.sectionBadge}>SIMPLE PROCESS</Text>
        <Text style={globalStyles.sectionTitle}>Simple Steps to Educational Success</Text>
        <Text style={globalStyles.sectionSubtitle}>
          Our streamlined process makes it easy to access quality education through ScholarPASS
        </Text>
        
        <View style={styles.stepsContainer}>
          {howItWorksSteps.map((item, index) => (
            <View key={item.id.toString()}>
              {renderStep({ item, index })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray50,
  },
  sectionBadge: {
    ...typography.caption,
    color: colors.primary,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    ...shadows.sm,
  },
  stepsContainer: {
    paddingHorizontal: spacing.sm,
  },
  stepContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  stepCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...shadows.md,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    marginTop: spacing.xs,
  },
  stepNumberText: {
    ...typography.button,
    color: colors.white,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  stepTitle: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  stepDescription: {
    ...typography.body2,
    color: colors.gray600,
    lineHeight: 20,
  },
  connectionLine: {
    position: 'absolute',
    left: 19, // Center of step number circle
    top: 60, // Start below the step number
    width: 2,
    height: spacing.lg,
    backgroundColor: colors.gray200,
    zIndex: -1,
  },
});

export default HowItWorks;
