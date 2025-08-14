import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FooterTabItem } from '../utils/data';
import TabIcon from './TabIcon';

interface FooterTabProps {
  item: FooterTabItem;
  isActive: boolean;
  onPress: () => void;
}

const FooterTab: React.FC<FooterTabProps> = ({ item, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.tabContainer} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <TabIcon 
          type={item.icon} 
          size={20} 
          color={isActive ? '#FFFFFF' : '#9CA3AF'} 
        />
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#6C5CE7',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#6C5CE7',
    fontWeight: '600',
  },
});

export default FooterTab;
