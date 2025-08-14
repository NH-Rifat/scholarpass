import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: string;
  date: string;
  image: string;
}

const RecommendedExams = () => {
  const exams: Exam[] = [
    {
      id: '1',
      title: 'Mathematics Final Exam',
      subject: 'Advanced Mathematics',
      duration: '2 hours',
      date: '3/15/2024',
      image: 'math',
    },
    {
      id: '2',
      title: 'English Literature Exam',
      subject: 'Literature Analysis',
      duration: '1 hour',
      date: '3/20/2024',
      image: 'english',
    },
    {
      id: '3',
      title: 'Physics Midterm',
      subject: 'Physics Fundamentals',
      duration: '1.5 hours',
      date: '3/25/2024',
      image: 'physics',
    },
    {
      id: '4',
      title: 'Chemistry Test',
      subject: 'Organic Chemistry',
      duration: '2 hours',
      date: '3/30/2024',
      image: 'chemistry',
    },
  ];

  const handleViewAll = () => {
    console.log('View All exams pressed');
  };

  const handleTakeExam = (examId: string) => {
    console.log('Take Exam pressed for:', examId);
  };

  const renderExamCard = (exam: Exam) => {
    return (
      <View key={exam.id} style={styles.examCard}>
        {/* Exam Image */}
        <View style={styles.examImageContainer}>
          <View style={styles.examPlaceholder}>
            <Text style={styles.examPlaceholderIcon}>📝</Text>
          </View>
        </View>

        {/* Exam Info */}
        <View style={styles.examInfo}>
          <Text style={styles.examTitle}>{exam.title}</Text>
          <Text style={styles.examSubject}>{exam.subject}</Text>
          
          {/* Duration and Date Row */}
          <View style={styles.examMetaRow}>
            <View style={styles.durationContainer}>
              <Text style={styles.durationIcon}>🕐</Text>
              <Text style={styles.durationText}>{exam.duration}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>{exam.date}</Text>
            </View>
          </View>

          {/* Take Exam Button */}
          <TouchableOpacity 
            style={styles.takeExamButton}
            onPress={() => handleTakeExam(exam.id)}
          >
            <Text style={styles.takeExamButtonIcon}>📝</Text>
            <Text style={styles.takeExamButtonText}>Take Exam</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.sectionIcon}>📝</Text>
          <Text style={styles.sectionTitle}>Recommended Exams</Text>
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
        snapToInterval={276} // card width + margin
        snapToAlignment="start"
      >
        {exams.map(renderExamCard)}
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
  examCard: {
    width: 260,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginRight: spacing.md,
    ...shadows.lg,
    borderWidth: 0,
    overflow: 'hidden',
    elevation: 8, // For Android shadow
    marginVertical: spacing.sm,
    // Additional styling for better card distinction
    shadowColor: colors.gray900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  examImageContainer: {
    height: 140,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examPlaceholderIcon: {
    fontSize: 40,
    color: colors.gray400,
  },
  examInfo: {
    padding: spacing.lg,
  },
  examTitle: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  examSubject: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  examMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  durationText: {
    ...typography.body2,
    color: colors.gray600,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  dateText: {
    ...typography.body2,
    color: colors.gray600,
  },
  takeExamButton: {
    backgroundColor: colors.purple600,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeExamButtonIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  takeExamButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default RecommendedExams;