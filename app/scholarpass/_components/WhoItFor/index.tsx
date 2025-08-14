import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, globalStyles, shadows, spacing, typography } from '../../styles/globalStyles';
import { targetAudience } from '../../utils/data';

const WhoItFor = () => {
  const renderAudienceCard = ({ item }: { item: typeof targetAudience[0] }) => (
    <View style={styles.audienceCard}>
      <View style={styles.iconContainer}>
        <Text style={styles.audienceIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.audienceTitle}>{item.title}</Text>
      <Text style={styles.audienceDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={globalStyles.section}>
        <Text style={styles.sectionBadge}>WHO WE SERVE</Text>
        <Text style={globalStyles.sectionTitle}>Serving Those Who Need It Most</Text>
        <Text style={globalStyles.sectionSubtitle}>
          ScholarPASS is designed to bridge educational gaps and provide opportunities for all
        </Text>
        
        <View>
          {targetAudience.map((item, index) => (
            <View key={item.id.toString()}>
              {renderAudienceCard({ item })}
              {index < targetAudience.length - 1 && (
                <View style={{ height: spacing.md }} />
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
    backgroundColor: colors.white,
  },
  sectionBadge: {
    ...typography.caption,
    color: colors.primary,
    backgroundColor: colors.blue50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  audienceCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
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
  audienceIcon: {
    fontSize: 40,
  },
  audienceTitle: {
    ...typography.h4,
    color: colors.gray900,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  audienceDescription: {
    ...typography.body2,
    color: colors.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default WhoItFor;
