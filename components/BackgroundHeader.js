/* eslint-disable global-require */
import React from 'react'

import { Dimensions, Image, Platform, View } from 'react-native'

const BackgroundHeader = () => {
  const headerHeight = Platform.select({
    android: 78,
    ios: 93,
  })

  return (
    <View style={{ backgroundColor: 'rgba(231, 73, 62, 0.98)', flex: 1 }}>
      <Image
        resizeMode="cover"
        source={require('../assets/images/header_bg.png')}
        style={{
          height: headerHeight,
          width: Dimensions.get('window').width,
        }}
      />
    </View>
  )
}

export default BackgroundHeader
