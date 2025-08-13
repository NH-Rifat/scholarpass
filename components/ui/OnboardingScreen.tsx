import { colors } from '@/app/(Home)/styles/globalStyles';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingData {
  id: number;
  title: string;
  subtitle: string;
  cards: Array<{
    id: number;
    title: string;
    icon: string;
    iconLibrary: 'Ionicons' | 'MaterialIcons' | 'Feather' | 'MaterialCommunityIcons';
    backgroundColor: string;
    textColor: string;
  }>;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: 'One Platform.\nUnlimited Learning.',
    subtitle: '',
    cards: [
      {
        id: 1,
        title: 'Live Tutoring',
        icon: 'people-outline',
        iconLibrary: 'Ionicons',
        backgroundColor: '#E8F4FD',
        textColor: '#1E40AF',
      },
      {
        id: 2,
        title: 'AI Tutors',
        icon: 'smart-toy',
        iconLibrary: 'MaterialIcons',
        backgroundColor: '#F0FDF4',
        textColor: '#166534',
      },
      {
        id: 3,
        title: 'Local Schools',
        icon: 'home',
        iconLibrary: 'Feather',
        backgroundColor: '#FEF3C7',
        textColor: '#D97706',
      },
      {
        id: 4,
        title: 'Self-Paced\nCourses',
        icon: 'book-open-outline',
        iconLibrary: 'Ionicons',
        backgroundColor: '#F3E8FF',
        textColor: '#7C3AED',
      },
    ],
  },
  {
    id: 2,
    title: 'ScholarPASS',
    subtitle: 'Unlock your potential with comprehensive\nlearning paths',
    cards: [
      {
        id: 1,
        title: 'K12 Tutoring',
        icon: 'book-open-outline',
        iconLibrary: 'Ionicons',
        backgroundColor: '#FEF3C7',
        textColor: '#D97706',
      },
      {
        id: 2,
        title: 'Coding &\nRobotics',
        icon: 'code-slash',
        iconLibrary: 'Ionicons',
        backgroundColor: '#E8F4FD',
        textColor: '#1E40AF',
      },
      {
        id: 3,
        title: 'Test Preps',
        icon: 'ribbon-outline',
        iconLibrary: 'Ionicons',
        backgroundColor: '#FDE8E8',
        textColor: '#DC2626',
      },
      {
        id: 4,
        title: 'Sports',
        icon: 'trending-up',
        iconLibrary: 'Feather',
        backgroundColor: '#F3E8FF',
        textColor: '#7C3AED',
      },
    ],
  },
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderIcon = (iconName: string, iconLibrary: string, color: string, size: number = 32) => {
    switch (iconLibrary) {
      case 'Ionicons':
        return <Ionicons name={iconName as any} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName as any} size={size} color={color} />;
      case 'Feather':
        return <Feather name={iconName as any} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
      default:
        return <Ionicons name="help-outline" size={size} color={color} />;
    }
  };

  const renderCard = (card: any) => (
    <View key={card.id} style={[styles.card, { backgroundColor: card.backgroundColor }]}>
      <View style={styles.cardIcon}>
        {renderIcon(card.icon, card.iconLibrary, card.textColor, 28)}
      </View>
      <Text style={[styles.cardTitle, { color: card.textColor }]}>{card.title}</Text>
    </View>
  );

  const renderOnboardingItem = ({ item }: { item: OnboardingData }) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.cardsRow}>
            {renderCard(item.cards[0])}
            {renderCard(item.cards[1])}
          </View>
          <View style={styles.cardsRow}>
            {renderCard(item.cards[2])}
            {renderCard(item.cards[3])}
          </View>
        </View>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      // Navigate to home screen
      router.replace('/(Home)');
    }
  };

  const handleSkip = () => {
    router.replace('/(Home)');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.container}
      >
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderOnboardingItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />

        {/* Bottom Navigation */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Page Indicators */}
          <View style={styles.indicatorContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentIndex ? colors.white : 'rgba(255, 255, 255, 0.3)',
                  },
                ]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Ionicons name="arrow-forward" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  cardsContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16, // Horizontal gap between cards
  },
  card: {
    width: 140,
    height: 120,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  skipButton: {
    width: 60,
  },
  skipText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
