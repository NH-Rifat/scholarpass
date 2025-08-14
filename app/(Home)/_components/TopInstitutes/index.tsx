import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';

interface Institute {
  id: string;
  name: string;
  location: string;
  category: string;
  coursesCount: number;
  rating: number;
  image: string;
}

const TopInstitutes = () => {
  const institutes: Institute[] = [
    {
      id: '1',
      name: 'Brooklyn Learning Center',
      location: 'Brooklyn, NY',
      category: 'STEM Education',
      coursesCount: 45,
      rating: 4.8,
      image: 'brooklyn',
    },
    {
      id: '2',
      name: 'Manhattan Arts Academy',
      location: 'Manhattan, NY',
      category: 'Liberal Arts',
      coursesCount: 62,
      rating: 4.6,
      image: 'manhattan',
    },
    {
      id: '3',
      name: 'Queens Tech Institute',
      location: 'Queens, NY',
      category: 'Technology',
      coursesCount: 38,
      rating: 4.9,
      image: 'queens',
    },
    {
      id: '4',
      name: 'Bronx Science Center',
      location: 'Bronx, NY',
      category: 'Science',
      coursesCount: 52,
      rating: 4.7,
      image: 'bronx',
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
      case 'stem education':
        return colors.blue500;
      case 'liberal arts':
        return colors.blue500;
      case 'technology':
        return colors.purple600;
      case 'science':
        return colors.success;
      default:
        return colors.blue500;
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

  const renderInstituteCard = (institute: Institute) => {
    return (
      <View key={institute.id} style={styles.instituteCard}>
        {/* Category Tag */}
        <View style={styles.categoryTagContainer}>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(institute.category) }]}>
            <Text style={styles.categoryTagText}>{institute.category}</Text>
          </View>
        </View>

        {/* Institute Image */}
        <View style={styles.instituteImageContainer}>
          <View style={styles.institutePlaceholder}>
            <Text style={styles.institutePlaceholderIcon}>🏛️</Text>
          </View>
        </View>

        {/* Institute Info */}
        <View style={styles.instituteInfo}>
          <Text style={styles.instituteName}>{institute.name}</Text>
          <Text style={styles.instituteLocation}>{institute.location}</Text>
          
          <Text style={styles.coursesCount}>{institute.coursesCount} courses</Text>
          
          {/* Rating Row */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Rating</Text>
            {renderStars(institute.rating)}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Top Institutes</Text>
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
        {institutes.map(renderInstituteCard)}
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
  instituteCard: {
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
  instituteImageContainer: {
    height: 140,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  institutePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  institutePlaceholderIcon: {
    fontSize: 40,
    color: colors.gray400,
  },
  instituteInfo: {
    padding: spacing.lg,
  },
  instituteName: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.xs,
    fontSize: 18,
  },
  instituteLocation: {
    ...typography.body2,
    color: colors.blue600,
    marginBottom: spacing.md,
  },
  coursesCount: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingLabel: {
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
});

export default TopInstitutes;
