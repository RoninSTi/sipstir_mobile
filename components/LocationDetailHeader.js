import React from 'react'
import PropTypes from 'prop-types'

import { Dimensions, StyleSheet, Text, View } from 'react-native'

import GooglePlaceImage from './GooglePlaceImage'

const { width: WIDTH } = Dimensions.get('window')

const IMAGE_HEIGHT = WIDTH

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    left: 0,
    padding: 14,
    position: 'absolute',
    right: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  vicinity: {
    color: '#FFFFFF',
    fontSize: 14,
  },
})

const LocationDetailHeader = ({ location }) => {
  const { name, photo, vicinity } = location

  return (
    <View style={styles.container}>
      <GooglePlaceImage height={IMAGE_HEIGHT} image={photo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.vicinity}>{vicinity}</Text>
      </View>
    </View>
  )
}

LocationDetailHeader.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.shape(),
    vicinity: PropTypes.string,
  }).isRequired,
}

export default LocationDetailHeader
