import { colors, spacing, typography } from "@/app/(Home)/styles/globalStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TopBarProps {
  onMenuPress: () => void;
}

const TopBar = ({ onMenuPress }: TopBarProps) => {
  const router = useRouter();
  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handleLogoPress = () => {
    router.push("/(Home)");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
        <Image
          source={require("../../../../../assets/images/logo/scholarpass-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right Actions */}
      <View style={styles.rightActions}>
        {/* Notification Bell */}
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
        >
          <Text style={styles.bellIcon}>🔔</Text>
          {/* Red notification dot */}
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        {/* Hamburger Menu */}
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    // ...shadows.sm,
    height: 60,
  },
  logo: {
    height: 40,
    width: 160,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  logoIconText: {
    fontSize: 16,
    color: colors.white,
  },
  logoText: {
    ...typography.h4,
    color: colors.gray900,
    fontWeight: "bold",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  notificationButton: {
    position: "relative",
    padding: spacing.xs,
  },
  bellIcon: {
    fontSize: 20,
    color: colors.gray600,
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    backgroundColor: colors.error,
    borderRadius: 4,
  },
  menuButton: {
    padding: spacing.xs,
    gap: 3,
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: colors.gray600,
    borderRadius: 1,
  },
});

export default TopBar;
