import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  price: number;
  image: string;
  enrolled?: boolean;
}

const RecommendedCourses = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      duration: '12 weeks',
      rating: 4.8,
      price: 299,
      image: 'math',
    },
    {
      id: '2',
      title: 'English Literature',
      instructor: 'Prof. Michael Brown',
      duration: '10 weeks',
      rating: 4.6,
      price: 249,
      image: 'english',
    },
    {
      id: '3',
      title: 'Physics Fundamentals',
      instructor: 'Dr. Emily Chen',
      duration: '8 weeks',
      rating: 4.9,
      price: 199,
      image: 'physics',
    },
    {
      id: '4',
      title: 'Chemistry Basics',
      instructor: 'Prof. David Wilson',
      duration: '6 weeks',
      rating: 4.7,
      price: 179,
      image: 'chemistry',
    },
  ];

  const handleViewAll = () => {
    console.log('View All courses pressed');
  };

  const handleEnrollCourse = (courseId: string) => {
    console.log('Enroll course pressed for:', courseId);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} style={styles.star}>⭐</Text>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Text key="half" style={styles.star}>⭐</Text>
      );
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  const renderCourseCard = (course: Course) => {
    return (
      <View key={course.id} style={styles.courseCard}>
        {/* Course Image */}
        <View style={styles.courseImageContainer}>
          <View style={styles.coursePlaceholder}>
            <Text style={styles.coursePlaceholderIcon}>📚</Text>
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructorName}>{course.instructor}</Text>
          
          {/* Duration and Rating Row */}
          <View style={styles.courseMetaRow}>
            <View style={styles.durationContainer}>
              <Text style={styles.durationIcon}>🕐</Text>
              <Text style={styles.durationText}>{course.duration}</Text>
            </View>
            {renderStars(course.rating)}
          </View>

          {/* Price and Enroll Row */}
          <View style={styles.priceEnrollRow}>
            <Text style={styles.priceText}>${course.price}</Text>
            <TouchableOpacity 
              style={styles.enrollButton}
              onPress={() => handleEnrollCourse(course.id)}
            >
              <Text style={styles.enrollButtonText}>Enroll</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.sectionIcon}>📚</Text>
          <Text style={styles.sectionTitle}>Recommended Courses</Text>
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
        snapToInterval={280} // card width + margin
        snapToAlignment="start"
      >
        {courses.map(renderCourseCard)}
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
  courseCard: {
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
  courseImageContainer: {
    height: 140,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coursePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coursePlaceholderIcon: {
    fontSize: 40,
    color: colors.gray400,
  },
  courseInfo: {
    padding: spacing.lg,
  },
  courseTitle: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  instructorName: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  courseMetaRow: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    ...typography.body2,
    color: colors.gray700,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  priceEnrollRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    ...typography.h4,
    color: colors.purple600,
    fontWeight: 'bold',
  },
  enrollButton: {
    backgroundColor: colors.purple600,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  enrollButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default RecommendedCourses;