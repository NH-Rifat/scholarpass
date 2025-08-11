import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';
import { courseCategories } from '../../utils/data';

const Opportunities = () => {
  const renderCourseCard = ({ item }: { item: typeof courseCategories[0] }) => (
    <View style={[styles.courseCard, { borderColor: item.color }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
          <Text style={styles.courseIcon}>{item.icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseDescription}>{item.description}</Text>
        </View>
      </View>
      
      <View style={styles.coursesContainer}>
        <Text style={styles.coursesLabel}>Popular Courses:</Text>
        {item.courses.slice(1).map((course, index) => (
          <View key={index} style={styles.courseItem}>
            <View style={styles.courseBullet} />
            <Text style={styles.courseItemText}>{course}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={[styles.viewButton, { backgroundColor: item.color }]}>
        <Text style={styles.viewButtonText}>View All Courses</Text>
        <Text style={styles.buttonArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.headerContainer}>
          <Text style={styles.sectionBadge}>🎓 SCHOLARSHIP OPPORTUNITIES</Text>
          <Text style={styles.sectionTitle}>Learn These Courses with ScholarPASS Scholarships</Text>
          <Text style={styles.sectionSubtitle}>
            Get up to 100% scholarship funding for these popular educational programs and unlock your potential
          </Text>
        </View>
        
        <View style={styles.gridContainer}>
          {courseCategories.map((item, index) => (
            <View key={item.id.toString()}>
              {renderCourseCard({ item })}
              {index < courseCategories.length - 1 && (
                <View style={{ height: spacing.lg }} />
              )}
            </View>
          ))}
        </View>
        
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore All Courses</Text>
          </TouchableOpacity>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Partners</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$2M+</Text>
              <Text style={styles.statLabel}>Scholarships</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray50,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  sectionBadge: {
    ...typography.caption,
    color: colors.primary,
    backgroundColor: colors.blue50,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.gray900,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    ...typography.body1,
    color: colors.gray600,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  gridContainer: {
    paddingBottom: spacing.xl,
  },
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.lg,
    marginHorizontal: spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  courseIcon: {
    fontSize: 28,
  },
  headerText: {
    flex: 1,
    flexShrink: 1,
  },
  courseTitle: {
    ...typography.h3,
    color: colors.gray900,
    marginBottom: spacing.xs,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  courseDescription: {
    ...typography.body2,
    color: colors.gray600,
    lineHeight: 20,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  coursesContainer: {
    marginBottom: spacing.lg,
  },
  coursesLabel: {
    ...typography.body2,
    color: colors.gray800,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  courseBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  courseItemText: {
    ...typography.body2,
    color: colors.gray700,
    fontSize: 14,
    flex: 1,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  buttonArrow: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  exploreButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xxl,
    ...shadows.md,
  },
  exploreButtonText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray600,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray200,
    marginHorizontal: spacing.md,
  },
});

export default Opportunities;