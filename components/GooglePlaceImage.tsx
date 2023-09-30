import React from 'react'

import { Image, StyleSheet, View } from 'react-native'

import { AccountPhoto } from '../types'

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACE_API_KEY

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
})

type Props = {
  containerStyle: object;
  image?: AccountPhoto;
  height: number;
}

const GooglePlaceImage: React.FC<Props> = ({ containerStyle = {}, image, height = 100 }) => {
  if (!image) return null

  const { photo_reference: photoReference } = image

  const uri = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=${height}&key=${API_KEY}`

  return (
    <View style={[containerStyle, { height, width: height }]}>
      <Image resizeMode="cover" style={styles.image} source={{ uri }} />
    </View>
  )
}

export default GooglePlaceImage
