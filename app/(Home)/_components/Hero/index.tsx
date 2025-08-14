import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "../../styles/globalStyles";

const Hero = () => {
  const router = useRouter();
  const handleJoinNow = () => {
    router.push("/scholarpass");
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  welcomeSection: {
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    ...typography.h3,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    ...typography.body1,
    color: colors.gray600,
  },
  membershipCard: {
    backgroundColor: "#8B5CF6",
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: "column",
    gap: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  membershipContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 20,
    color: colors.white,
  },
  membershipText: {
    flex: 1,
  },
  membershipTitle: {
    ...typography.h4,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  membershipSubtitle: {
    ...typography.body2,
    color: "rgba(255, 255, 255, 0.8)",
  },
  joinButton: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xs,
  },
  joinButtonText: {
    ...typography.button,
    color: "#8B5CF6",
  },
  statsGrid: {
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
  },
  blueCard: {
    backgroundColor: "#EFF6FF",
  },
  purpleCard: {
    backgroundColor: "#F3E8FF",
  },
  pinkCard: {
    backgroundColor: "#FDF2F8",
  },
  orangeCard: {
    backgroundColor: "#FFF7ED",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  statNumber: {
    ...typography.h2,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.body2,
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 18,
  },
});

export default Hero;
