/* eslint-disable global-require */
import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  absolute: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});

const HeaderTitle = () => {
  return (
    <View>
      <View style={styles.absolute}>
        <Image
          source={require('../assets/images/icon_cheers_dark.png')}
          style={{ height: 33, tintColor: '#EFA6A0', width: 40 }}
        />
      </View>
      <Text style={styles.title}>BarSnap</Text>
    </View>
  );
};

export default HeaderTitle;
