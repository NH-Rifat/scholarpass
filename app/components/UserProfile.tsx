import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/actions/authActions';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../(Home)/styles/globalStyles';

const UserProfile = () => {
  const { user, isLoggedIn, fullName, userRoles } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            router.replace('/(Home)');
          },
        },
      ]
    );
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedInText}>Please login to view profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.title}>User Profile</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{fullName}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Roles:</Text>
          <Text style={styles.value}>{userRoles.join(', ')}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{user?.id}</Text>
        </View>
        
        {user?.is_super_admin && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminText}>Super Admin</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.gray50,
  },
  profileCard: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 12,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 24,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray600,
  },
  value: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    textAlign: 'right',
  },
  adminBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 16,
  },
  adminText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notLoggedInText: {
    fontSize: 18,
    color: colors.gray600,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default UserProfile;
