import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../(Home)/styles/globalStyles";
import Header from "../components/layout/publicLayout/Header";

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header isLoggedIn={false} />

      {/* Auth Pages */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white },
          }}
        >
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="register/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="verifyEmail/index"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
});

export default AuthLayout;
