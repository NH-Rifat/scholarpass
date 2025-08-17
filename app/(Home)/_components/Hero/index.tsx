import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
const Hero = () => {
  const router = useRouter();
  const handleJoinNow = () => {
    router.push("/scholarpass");
  };

  const handleEnrollNow = () => {
    router.push("/register"); // Navigate to registration
  };

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome back, John Smith! 👋</Text>
        <Text style={styles.welcomeSubtitle}>
          Ready to continue your learning journey today?
        </Text>
      </View>

      {/* Membership Card */}
      <View style={styles.membershipCard}>
        <View style={styles.membershipContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👤</Text>
          </View>
          <View style={styles.membershipText}>
            <Text style={styles.membershipTitle}>
              Become a ScholarPASS Member
            </Text>
            <Text style={styles.membershipSubtitle}>
              Unlock K-12 Bundle & exclusive features
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinNow}>
          <Text style={styles.joinButtonText}>Join Now</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.blueCard]}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Enrolled Courses</Text>
          </View>
          <View style={[styles.statCard, styles.purpleCard]}>
            <Text style={styles.statIcon}>🕐</Text>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Upcoming Tutoring Sessions</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.pinkCard]}>
            <Text style={styles.statIcon}>🔖</Text>
            <Text style={styles.statNumber}>2400$</Text>
            <Text style={styles.statLabel}>ScholarPASS</Text>
          </View>
          <View style={[styles.statCard, styles.orangeCard]}>
            <Text style={styles.statIcon}>📄</Text>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Number of Exams</Text>
          </View>
        </View>
      </View>

      {/* Featured Package Card */}
      <View style={styles.packageCard}>
        {/* Featured Badge */}
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured Package</Text>
        </View>

        <View style={styles.packageContent}>
          {/* Left Content */}
          <View style={styles.packageLeft}>
            <Text style={styles.packageTitle}>ScholarPASS K12 Bundle</Text>
            <Text style={styles.packageDescription}>
              One comprehensive course covering all subjects for any K-12 grade,
              designed to provide complete educational support.
            </Text>

            {/* Features List */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Feather name="check-circle" size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>
                  All Subjects of any 3rd-12th Grade
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Feather name="users" size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>
                  Unlimited 1:1 or group tutoring
                </Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="lightning-bolt-outline"
                  size={20}
                  color="#8B5CF6"
                />
                <Text style={styles.featureText}>Unlimited self-learning</Text>
              </View>
              <View style={styles.featureItem}>
                <SimpleLineIcons name="badge" size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>
                  ScholarsPASS scholarship $1,000
                </Text>
              </View>
            </View>

            {/* Pricing */}
            <View style={styles.pricingContainer}>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>REGULAR PRICE</Text>
                <Text style={styles.regularPrice}>$2400</Text>
              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>SCHOLARPASS</Text>
                <Text style={styles.scholarPrice}>$1800</Text>
              </View>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>STUDENT PAYS</Text>
                <Text style={styles.studentPrice}>$600</Text>
              </View>
            </View>

            {/* Enroll Button */}
            <TouchableOpacity
              style={styles.enrollButton}
              onPress={handleEnrollNow}
            >
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
              <Text style={styles.enrollArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Right Content - Course Image */}
        </View>
      </View>
    </View>
  );
};

export default Hero;
