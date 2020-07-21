/* eslint-disable global-require */
import React from 'react';

import { Dimensions, Image, View } from 'react-native';

const BackgroundHeader = () => {
  return (
    <View style={{ backgroundColor: 'rgba(231, 73, 62, 0.98)', flex: 1 }}>
      <Image
        resizeMode="cover"
        source={require('../assets/images/header_bg.png')}
        style={{
          height: 88,
          width: Dimensions.get('window').width,
        }}
      />
    </View>
  );
};

export default BackgroundHeader;
