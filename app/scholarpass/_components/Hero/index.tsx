import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';
import { courseCategories } from '../../utils/data';

const Hero = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Brand Title with Gradient Effect */}
          <View style={styles.titleContainer}>
            <Text style={styles.brandName}>
              <Text style={styles.scholarText}>Scholar</Text>
              <Text style={styles.passText}>PASS</Text>
            </Text>
            <Text style={styles.mainTitle}>Covers Maximum Course Fees</Text>
          </View>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Unlimited K-12 Tutoring, Coding & Robotics Bootcamps—{'\n'}
            Funded by ScholarPASS Scholarship
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.primaryButton]}>
              <Text style={styles.primaryButtonText}>Apply for Scholarship</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Partner as an Institute</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.tertiaryButton]}>
              <Text style={styles.tertiaryButtonText}>Become a Sponsor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Course Categories Cards */}
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesGrid}>
            {courseCategories.slice(0, 4).map((category, index) => (
              <View key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: getCardColor(index) }]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

// Helper function for card colors
const getCardColor = (index: number) => {
  const cardColors = [colors.blue50, colors.purple50, colors.blue50, colors.purple50];
  return cardColors[index % cardColors.length];
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray50,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    minHeight: 600,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    marginBottom: spacing.xxl,
  },
  titleContainer: {
    marginBottom: spacing.xl,
  },
  brandName: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  scholarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary, // Blue color
  },
  passText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.secondary, // Purple color
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 56,
  },
  subtitle: {
    ...typography.body1,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 24,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    width: 250,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.secondary, // Purple
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.warning, // Orange
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary, // Blue
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: colors.warning, // Orange
    fontWeight: '600',
    fontSize: 16,
  },
  tertiaryButtonText: {
    color: colors.primary, // Blue
    fontWeight: '600',
    fontSize: 16,
  },
  categoriesContainer: {
    // marginTop: spacing.sm,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: '47%',
    minHeight: 120,
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryTitle: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.gray800,
    textAlign: 'center',
  },
});

export default Hero;