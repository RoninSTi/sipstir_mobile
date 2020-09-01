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

const GooglePlaceImage = ({ containerStyle, image }) => {
  if (!image) return null

  const { photoReference } = image

  const uri = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=100&key=${API_KEY}`

  return (
    <View style={containerStyle}>
      <Image resizeMode="cover" style={styles.image} source={{ uri }} />
    </View>
  )
}

GooglePlaceImage.defaultProps = {
  containerStyle: {},
  image: null,
}

GooglePlaceImage.propTypes = {
  containerStyle: ViewPropTypes.style,
  image: PropTypes.shape({
    photoReference: PropTypes.string,
  }),
}

export default GooglePlaceImage
