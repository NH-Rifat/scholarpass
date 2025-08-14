import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SideMenu, TopBar } from './_components';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <TopBar onMenuPress={handleMenuToggle} />
      <SideMenu 
        isVisible={isMenuOpen} 
        onClose={handleCloseMenu}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
});

export default Header;