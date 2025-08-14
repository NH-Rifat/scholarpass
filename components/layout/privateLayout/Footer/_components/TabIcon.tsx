import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface TabIconProps {
  type: string;
  size?: number;
  color?: string;
}

const TabIcon: React.FC<TabIconProps> = ({ type, size = 24, color = '#9CA3AF' }) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return <Feather name="home" size={size} color={color} />;
      case 'book':
        return <Feather name="book-open" size={size} color={color} />;
      case 'calendar':
        return <AntDesign name="calendar" size={size} color={color} />;
      case 'game':
        return <Ionicons name="game-controller-outline" size={size} color={color} />;
      case 'exam':
        return <Foundation name="clipboard-notes" size={size} color={color} />;
      default:
        return <Feather name="circle" size={size} color={color} />;
    }
  };

  return getIcon(type);
};

export default TabIcon;
