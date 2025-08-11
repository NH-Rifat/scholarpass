import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, globalStyles, shadows, spacing, typography } from '../../styles/globalStyles';
import { impactAreas } from '../../utils/data';

const WhyItMatters = () => {
  const renderImpactCard = ({ item }: { item: typeof impactAreas[0] }) => (
    <View style={styles.impactCard}>
      <View style={styles.iconContainer}>
        <Text style={styles.impactIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.impactTitle}>{item.title}</Text>
      <Text style={styles.impactDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={globalStyles.section}>
        <Text style={styles.sectionBadge}>WHY WE MATTER</Text>
        <Text style={globalStyles.sectionTitle}>Making a Difference Through Education</Text>
        <Text style={globalStyles.sectionSubtitle}>
          ScholarPASS is more than just a scholarship program—it&apos;s a movement for educational equity
        </Text>
        
        <View>
          {impactAreas.map((item, index) => (
            <View key={item.id.toString()}>
              {renderImpactCard({ item })}
              {index < impactAreas.length - 1 && (
                <View style={{ height: spacing.lg }} />
              )}
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
  impactCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  impactIcon: {
    fontSize: 40,
  },
  impactTitle: {
    ...typography.h4,
    color: colors.gray900,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  impactDescription: {
    ...typography.body2,
    color: colors.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default WhyItMatters;
