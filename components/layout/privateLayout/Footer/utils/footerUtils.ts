import { router } from 'expo-router';
import { FooterTabItem } from './data';

export const handleTabNavigation = (route: string) => {
  try {
    router.push(route as any);
  } catch (error) {
    console.log('Navigation error:', error);
  }
};

export const getCurrentRoute = (): string => {
  // This will be updated when we have proper route detection
  return '/(Home)';
};

export const isTabActive = (tab: FooterTabItem, currentRoute: string): boolean => {
  return tab.route === currentRoute;
};
