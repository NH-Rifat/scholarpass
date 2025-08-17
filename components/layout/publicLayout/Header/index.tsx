import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
} from "../../../../app/(Home)/styles/globalStyles";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

const Header = ({ isLoggedIn = false, userName = "John" }: HeaderProps) => {
  const router = useRouter();
  const handleApplyNow = () => {
    if (!isLoggedIn) {
      // Navigate to apply scholarship page if logged in
      console.log("Navigate to apply scholarship page");
      router.push("/register");
    } else {
      // Navigate to register page if not logged in
      router.push("/scholarpass/apply-scholarship");
    }
  };

  const handleLogoPress = () => {
    router.push("/(Home)");
  };

  const handleProfileMenu = () => {
    // Handle profile menu actions
    console.log("Profile menu clicked");
  };

  const renderLoggedOutHeader = () => (
    <View style={styles.headerContent}>
      {/* Logo */}
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
        <Image
          source={require("../../../../assets/images/logo/scholarpass-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Apply Now Button */}
      <TouchableOpacity
        style={styles.applyButtonSmall}
        onPress={handleApplyNow}
        activeOpacity={0.8}
      >
        <Text style={styles.applyButtonSmallText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoggedInHeader = () => (
    <View style={styles.headerContent}>
      {/* Logo */}
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
        <Image
          source={require("../../../../assets/images/logo/scholarpass-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyButtonSmall}
        onPress={handleApplyNow}
        activeOpacity={0.8}
      >
        <Text style={styles.applyButtonSmallText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.header}>
      {isLoggedIn ? renderLoggedInHeader() : renderLoggedOutHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    ...shadows.sm,
    minHeight: 64,
    marginTop: spacing.xl,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: 40,
    width: 160,
  },
  applyButtonSmall: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  applyButtonSmallText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Header;
