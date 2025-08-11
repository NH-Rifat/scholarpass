import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../(Home)/styles/globalStyles';
import RegisterForm from './_components/RegisterForm';

const Register = () => {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Register;   