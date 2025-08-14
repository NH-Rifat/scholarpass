import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FooterTab } from './_components';
import { footerTabs } from './utils/data';
import { getCurrentRoute, handleTabNavigation, isTabActive } from './utils/footerUtils';

const Footer = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('/(Home)');

  useEffect(() => {
    setCurrentRoute(getCurrentRoute());
  }, []);

  const handleTabPress = (route: string) => {
    setCurrentRoute(route);
    handleTabNavigation(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {footerTabs.map((tab) => (
            <FooterTab
              key={tab.id}
              item={tab}
              isActive={isTabActive(tab, currentRoute)}
              onPress={() => handleTabPress(tab.route)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
});

export default Footer;