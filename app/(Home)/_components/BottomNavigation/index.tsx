import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, shadows, spacing } from '../../styles/globalStyles';

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
}

const BottomNavigation = ({ activeTab = 'home', onTabPress }: BottomNavigationProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabPress = (tabName: string) => {
    setCurrentTab(tabName);
    onTabPress?.(tabName);
    console.log(`Navigate to ${tabName}`);
  };

  const tabs = [
    {
      name: 'home',
      label: 'Home',
      IconComponent: Ionicons,
      iconName: 'home-outline' as const,
      activeIconName: 'home' as const,
    },
    {
      name: 'contact',
      label: 'Contact',
      IconComponent: AntDesign,
      iconName: 'contacts' as const,
      activeIconName: 'contacts' as const,
    },
    {
      name: 'profile',
      label: 'Profile',
      IconComponent: Feather,
      iconName: 'user' as const,
      activeIconName: 'user' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tabItem,
              currentTab === tab.name && styles.activeTabItem,
            ]}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.iconContainer,
              currentTab === tab.name && styles.activeIconContainer,
            ]}>
              <tab.IconComponent
                name={currentTab === tab.name ? tab.activeIconName : tab.iconName as any}
                size={20}
                color={currentTab === tab.name ? colors.white : colors.gray500}
              />
            </View>
            <Text style={[
              styles.tabLabel,
              currentTab === tab.name && styles.activeTabLabel,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    ...shadows.lg,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  activeTabItem: {
    // Active tab styling handled by individual elements
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  activeIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    ...shadows.sm,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.gray500,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 10,
  },
});

export default BottomNavigation;
