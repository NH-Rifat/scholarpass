import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import BottomNavigation from "../components/layout/publicLayout/BottomNavigation";
import Header from "../components/layout/publicLayout/Header";
import { colors, globalStyles } from "./styles/globalStyles";

export default function HomeLayout() {
  const isLoggedIn = true; // Change this based on user authentication
  const userName = "John Doe"; // Get from user context/state

  const handleTabPress = (tabName: string) => {
    // Handle navigation to different tabs
    console.log(`Navigate to ${tabName} tab`);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header isLoggedIn={isLoggedIn} userName={userName} />
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Slot />
        </ScrollView>
        {isLoggedIn && (
          <BottomNavigation activeTab="home" onTabPress={handleTabPress} />
        )}
      </View>
    </SafeAreaView>
  );
}
