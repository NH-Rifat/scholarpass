import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";

import BottomNavigation from "@/components/layout/publicLayout/BottomNavigation";
import Header from "@/components/layout/publicLayout/Header";
import { useAppDispatch, useAppSelector } from "@/store";
import { restoreAuthState } from "@/store/actions/authActions";
import { selectAuth } from "@/store/slices/authSlice";
import { colors, globalStyles } from "./styles/globalStyles";

export default function ScholarPassLayout() {
  const dispatch = useAppDispatch();
  // Load data directly from Redux store
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth);
  console.log("🏠 Home - Auth state from Redux store:", {
    user,
    isAuthenticated,
    isLoading,
  });

  // Restore auth state when component mounts
  useEffect(() => {
    console.log("🏠 Home - Dispatching restoreAuthState...");
    dispatch(restoreAuthState());
  }, [dispatch]);
  const userName = user?.first_name || "John Doe";

  const handleTabPress = (tabName: string) => {
    // Handle navigation to different tabs
    console.log(`Navigate to ${tabName} tab`);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header isLoggedIn={isAuthenticated} userName={userName} />
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Slot />
        </ScrollView>
        {isAuthenticated && (
          <BottomNavigation activeTab="home" onTabPress={handleTabPress} />
        )}
      </View>
    </SafeAreaView>
  );
}
