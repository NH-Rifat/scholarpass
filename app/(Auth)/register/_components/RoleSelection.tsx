import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../../(Home)/styles/globalStyles';

interface Role {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface RoleSelectionProps {
  roles: Role[];
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
}

const RoleSelection = ({ roles, selectedRole, onRoleSelect }: RoleSelectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your role</Text>
      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleCard,
              selectedRole === role.id && styles.selectedRoleCard
            ]}
            onPress={() => onRoleSelect(role.id)}
            activeOpacity={0.8}
          >
            <View style={styles.roleIcon}>
              <Text style={styles.roleIconText}>{role.icon}</Text>
            </View>
            <Text style={[
              styles.roleName,
              selectedRole === role.id && styles.selectedRoleName
            ]}>
              {role.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.gray800,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  selectedRoleCard: {
    backgroundColor: colors.blue50,
    borderColor: colors.primary,
  },
  roleIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  roleIconText: {
    fontSize: 24,
  },
  roleName: {
    ...typography.body2,
    color: colors.gray600,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedRoleName: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default RoleSelection;
