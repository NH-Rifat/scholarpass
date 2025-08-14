import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';

interface TrendingCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  price: number;
  image: string;
}

const TrendingCourses = () => {
  const trendingCourses: TrendingCourse[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      category: 'Mathematics',
      rating: 4.8,
      price: 99,
      image: 'math',
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      instructor: 'Prof. Michael Brown',
      category: 'Science',
      rating: 4.6,
      price: 89,
      image: 'physics',
    },
    {
      id: '3',
      title: 'Chemistry Basics',
      instructor: 'Dr. Emily Chen',
      category: 'Chemistry',
      rating: 4.9,
      price: 79,
      image: 'chemistry',
    },
    {
      id: '4',
      title: 'English Literature',
      instructor: 'Prof. David Wilson',
      category: 'English',
      rating: 4.7,
      price: 69,
      image: 'english',
    },
  ];

  const handlePrevious = () => {
    console.log('Previous pressed');
  };

  const handleNext = () => {
    console.log('Next pressed');
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mathematics':
        return colors.purple600;
      case 'science':
        return colors.purple600;
      case 'chemistry':
        return colors.blue600;
      case 'english':
        return colors.secondary;
      default:
        return colors.purple600;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} style={styles.star}>⭐</Text>
      );
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  const renderCourseCard = (course: TrendingCourse) => {
    return (
      <View key={course.id} style={styles.courseCard}>
        {/* Category Tag */}
        <View style={styles.categoryTagContainer}>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(course.category) }]}>
            <Text style={styles.categoryTagText}>{course.category}</Text>
          </View>
        </View>

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
          
          {/* Price and Rating Row */}
          <View style={styles.priceRatingRow}>
            <Text style={styles.priceText}>${course.price}</Text>
            {renderStars(course.rating)}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Trending Courses</Text>
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
            <Text style={styles.navButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
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
        {trendingCourses.map(renderCourseCard)}
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
  sectionTitle: {
    ...typography.h4,
    color: colors.gray900,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  navButtonText: {
    ...typography.body1,
    color: colors.gray600,
    fontWeight: '600',
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
    position: 'relative',
  },
  categoryTagContainer: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    zIndex: 1,
  },
  categoryTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  categoryTagText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
    fontSize: 12,
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
    fontSize: 18,
  },
  instructorName: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    ...typography.h4,
    color: colors.purple600,
    fontWeight: 'bold',
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
});

export default TrendingCourses;
