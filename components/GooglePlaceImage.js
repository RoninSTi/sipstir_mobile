import React from 'react'
import PropTypes from 'prop-types'

import { Image, StyleSheet, View, ViewPropTypes } from 'react-native'

import env from '../environment'

const API_KEY = env.google.placeApiKey

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
})

const GooglePlaceImage = ({ containerStyle, image, height }) => {
  if (!image) return null

  const { photo_reference: photoReference } = image

  const uri = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=${height}&key=${API_KEY}`

  return (
    <View style={[containerStyle, { height, width: height }]}>
      <Image resizeMode="cover" style={styles.image} source={{ uri }} />
    </View>
  )
}

GooglePlaceImage.defaultProps = {
  containerStyle: {},
  image: null,
  height: 100,
}

GooglePlaceImage.propTypes = {
  containerStyle: ViewPropTypes.style,
  image: PropTypes.shape({
    photo_reference: PropTypes.string,
  }),
  height: PropTypes.number,
}

export default GooglePlaceImage
