import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../(Home)/styles/globalStyles";
import VerifyEmailForm from "./_components/VerifyEmailForm";

const VerifyEmail = () => {
  return (
    <View style={styles.container}>
      <VerifyEmailForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default VerifyEmail;
