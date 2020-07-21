import React from 'react';

import { ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: '#5177FF',
    borderRadius: 20,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  container: {
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

const BackgroundButton = ({ containerStyle, icon, isLoading, onPress, source, title }) => {
  const showIcon = icon && !isLoading;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      <ImageBackground source={source} style={styles.background}>
        {showIcon && icon()}
        {isLoading && <ActivityIndicator color="#FFFFFF" size={20} style={{ marginRight: 7 }} />}
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default BackgroundButton;
