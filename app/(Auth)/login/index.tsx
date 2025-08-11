import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../(Home)/styles/globalStyles';
import LoginForm from './_components/LoginForm';

const Login = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Login;
