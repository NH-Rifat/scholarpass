import { borderRadius, colors, spacing, typography } from '@/app/(Home)/styles/globalStyles';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideMenu = ({ isVisible, onClose }: SideMenuProps) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen (300px to the right)
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start transparent

  useEffect(() => {
    if (isVisible) {
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, fadeAnim]);

  const handleLogout = () => {
    console.log('Logout pressed');
    onClose();
  };

  const handleMenuItemPress = (item: string) => {
    console.log(`${item} pressed`);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Animated Background overlay */}
        <Animated.View 
          style={[
            styles.backgroundOverlay, 
            { opacity: fadeAnim }
          ]}
        >
          <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
        </Animated.View>
        
        {/* Animated Menu Content */}
        <Animated.View 
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          {/* Header */}
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* User Profile Section */}
          <View style={styles.userSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JS</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Smith</Text>
              <Text style={styles.userRole}>Student Dashboard</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('My Profile')}
            >
              <Text style={styles.menuItemIcon}>👤</Text>
              <Text style={styles.menuItemText}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('My Guardian')}
            >
              <Text style={styles.menuItemIcon}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.menuItemText}>My Guardian</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('My Scholarships')}
            >
              <Text style={styles.menuItemIcon}>🏆</Text>
              <Text style={styles.menuItemText}>My Scholarships</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Section */}
          <View style={styles.logoutSection}>
            <View style={styles.logoutSeparator} />
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={styles.logoutIconContainer}>
                <Text style={styles.logoutIcon}>↗</Text>
              </View>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end', // This ensures menu appears on the right
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: 300,
    height: '100%',
    backgroundColor: colors.white,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  menuTitle: {
    ...typography.h3,
    color: colors.gray900,
  },
  closeButton: {
    ...typography.h4,
    color: colors.gray600,
    fontSize: 18,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.purple600,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h4,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  userRole: {
    ...typography.body2,
    color: colors.gray600,
  },
  menuItems: {
    marginBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: spacing.md,
    width: 24,
  },
  menuItemText: {
    ...typography.body1,
    color: colors.gray700,
    flex: 1,
  },
  logoutSection: {
    marginTop: 'auto',
    paddingTop: spacing.lg,
  },
  logoutSeparator: {
    height: 1,
    backgroundColor: colors.gray200,
    marginBottom: spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.error + '10', // Light red background
    borderWidth: 1,
    borderColor: colors.error + '20',
  },
  logoutIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logoutIcon: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  logoutText: {
    ...typography.body1,
    color: colors.error,
    fontWeight: '600',
  },
});

export default SideMenu;
