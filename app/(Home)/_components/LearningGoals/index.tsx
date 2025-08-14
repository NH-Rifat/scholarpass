import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';

interface LearningGoal {
  id: string;
  title: string;
  subject: string;
  progress: number;
  dueDate: string;
  status: 'overdue' | 'progress' | 'completed';
  color: string;
}

const LearningGoals = () => {
  const learningGoals: LearningGoal[] = [
    {
      id: '1',
      title: 'Master Calculus',
      subject: 'Mathematics',
      progress: 75,
      dueDate: '4/15/2024',
      status: 'overdue',
      color: '#4285F4',
    },
    {
      id: '2',
      title: 'Advanced Physics',
      subject: 'Physics',
      progress: 60,
      dueDate: '5/20/2024',
      status: 'progress',
      color: '#34A853',
    },
    {
      id: '3',
      title: 'English Literature',
      subject: 'English',
      progress: 90,
      dueDate: '3/30/2024',
      status: 'completed',
      color: '#EA4335',
    },
    {
      id: '4',
      title: 'Chemistry Basics',
      subject: 'Chemistry',
      progress: 45,
      dueDate: '6/10/2024',
      status: 'progress',
      color: '#FBBC04',
    },
  ];

  const handleViewAll = () => {
    console.log('View All pressed');
  };

  const handleContinueGoal = (goalId: string) => {
    console.log('Continue Goal pressed for:', goalId);
  };

  const renderGoalCard = (goal: LearningGoal) => {
    const progressBarColor = goal.status === 'overdue' ? '#EF4444' : goal.color;
    const buttonColor = goal.status === 'overdue' ? '#4285F4' : '#34A853';
    const buttonText = goal.status === 'completed' ? 'Completed' : 'Continue Goal';

    return (
      <View key={goal.id} style={styles.goalCard}>
        {/* Goal Header */}
        <View style={styles.goalHeader}>
          <View style={[styles.subjectIcon, { backgroundColor: goal.color }]}>
            <Text style={styles.subjectIconText}>📚</Text>
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalSubject}>{goal.subject}</Text>
          </View>
          <View style={[styles.statusIcon, { backgroundColor: goal.status === 'overdue' ? '#34A853' : '#34A853' }]}>
            <Text style={styles.statusIconText}>🎯</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercentage}>{goal.progress}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${goal.progress}%`,
                    backgroundColor: progressBarColor
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Status and Date */}
        <View style={styles.statusSection}>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusDot}>⏰</Text>
              <Text style={[styles.statusText, goal.status === 'overdue' && styles.overdueText]}>
                {goal.status === 'overdue' ? 'Overdue' : 'Progress'}
              </Text>
            </View>
            <Text style={styles.dueDateText}>{goal.dueDate}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: buttonColor }]}
          onPress={() => handleContinueGoal(goal.id)}
          disabled={goal.status === 'completed'}
        >
          <Text style={styles.actionButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.sectionIcon}>🎯</Text>
          <Text style={styles.sectionTitle}>My Learning Goals</Text>
        </View>
        <TouchableOpacity onPress={handleViewAll}>
          <View style={styles.viewAllContainer}>
            <Text style={styles.viewAllText}>View All</Text>
            <Text style={styles.viewAllArrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll View */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={296}
        snapToAlignment="start"
      >
        {learningGoals.map(renderGoalCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.gray900,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...typography.body1,
    color: colors.purple500,
    marginRight: spacing.xs,
  },
  viewAllArrow: {
    ...typography.body1,
    color: colors.purple500,
  },
  scrollView: {
    paddingLeft: spacing.lg,
  },
  scrollContainer: {
    paddingRight: spacing.lg,
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  goalCard: {
    width: 280,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginRight: spacing.md,
    ...shadows.lg,
    borderWidth: 0,
    elevation: 8, // For Android shadow
    marginVertical: spacing.sm,
    // Additional styling for better card distinction
    shadowColor: colors.gray900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  subjectIconText: {
    fontSize: 18,
    color: colors.white,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  goalSubject: {
    ...typography.body2,
    color: colors.gray600,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIconText: {
    fontSize: 14,
  },
  progressSection: {
    marginBottom: spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    ...typography.body2,
    color: colors.gray600,
  },
  progressPercentage: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
  },
  progressBarContainer: {
    marginBottom: spacing.sm,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  statusSection: {
    marginBottom: spacing.lg,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    fontSize: 12,
    marginRight: spacing.xs,
  },
  statusText: {
    ...typography.body2,
    color: colors.gray600,
  },
  overdueText: {
    color: colors.error,
  },
  dueDateText: {
    ...typography.body2,
    color: colors.gray500,
  },
  actionButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default LearningGoals;