import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { colors } from '../app/(Home)/styles/globalStyles';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();
  const [loadingProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start the loading animation
    Animated.timing(loadingProgress, {
      toValue: 1,
      duration: 3000, // 3 seconds
      useNativeDriver: false,
    }).start(() => {
      // Navigate to onboarding after animation completes
      router.replace('/onboarding');
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']} // Purple gradient
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Main Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>ScholarPASS</Text>
            <Text style={styles.subtitle}>Learn Anytime, Anywhere</Text>
          </View>

          {/* Loading Bar */}
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
            <View style={styles.loadingBarBackground}>
              <Animated.View
                style={[
                  styles.loadingBarFill,
                  {
                    width: loadingProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    width: width - 60,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
    fontWeight: '400',
  },
  loadingBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  loadingBarFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default SplashScreen;
