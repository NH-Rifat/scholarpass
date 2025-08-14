import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../styles/globalStyles';

interface Game {
  id: string;
  title: string;
  subject: string;
  duration: string;
  rating: number;
  image: string;
}

const RecommendedGames = () => {
  const games: Game[] = [
    {
      id: '1',
      title: 'Math Quest Adventure',
      subject: 'Mathematics',
      duration: '30 min',
      rating: 4.8,
      image: 'math',
    },
    {
      id: '2',
      title: 'Science Lab Explorer',
      subject: 'Science',
      duration: '45 min',
      rating: 4.6,
      image: 'science',
    },
    {
      id: '3',
      title: 'Word Wizard Challenge',
      subject: 'English',
      duration: '25 min',
      rating: 4.9,
      image: 'english',
    },
    {
      id: '4',
      title: 'History Time Travel',
      subject: 'History',
      duration: '35 min',
      rating: 4.7,
      image: 'history',
    },
  ];

  const handleViewAll = () => {
    console.log('View All games pressed');
  };

  const handlePlayNow = (gameId: string) => {
    console.log('Play Now pressed for:', gameId);
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

  const renderGameCard = (game: Game) => {
    return (
      <View key={game.id} style={styles.gameCard}>
        {/* Game Image */}
        <View style={styles.gameImageContainer}>
          <View style={styles.gamePlaceholder}>
            <Text style={styles.gamePlaceholderIcon}>🎮</Text>
          </View>
        </View>

        {/* Game Info */}
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{game.title}</Text>
          <Text style={styles.gameSubject}>{game.subject}</Text>
          
          {/* Duration and Rating Row */}
          <View style={styles.gameMetaRow}>
            <View style={styles.durationContainer}>
              <Text style={styles.durationIcon}>🕐</Text>
              <Text style={styles.durationText}>{game.duration}</Text>
            </View>
            {renderStars(game.rating)}
          </View>

          {/* Play Now Button */}
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => handlePlayNow(game.id)}
          >
            <Text style={styles.playButtonIcon}>🎮</Text>
            <Text style={styles.playButtonText}>Play Now</Text>
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
          <Text style={styles.sectionIcon}>🎮</Text>
          <Text style={styles.sectionTitle}>Recommended Games</Text>
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
        {games.map(renderGameCard)}
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
  gameCard: {
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
  gameImageContainer: {
    height: 140,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gamePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gamePlaceholderIcon: {
    fontSize: 40,
    color: colors.gray400,
  },
  gameInfo: {
    padding: spacing.lg,
  },
  gameTitle: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  gameSubject: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  gameMetaRow: {
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
  playButton: {
    backgroundColor: colors.purple600,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  playButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default RecommendedGames;
