import React from 'react'
import PropTypes from 'prop-types'

import { Dimensions, StyleSheet, Text, View } from 'react-native'

import AccountImage from './AccountImage'

const { width: WIDTH } = Dimensions.get('window')

const IMAGE_HEIGHT = WIDTH

const IMAGE_WIDTH = WIDTH

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

const BusinessDetailHeader = ({ account }) => {
  return (
    <View style={styles.container}>
      <AccountImage account={account} height={IMAGE_HEIGHT} width={IMAGE_WIDTH} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{account.name}</Text>
        <Text style={styles.vicinity}>{account.location.vicinity}</Text>
      </View>
    </View>
  )
}

BusinessDetailHeader.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      vicinity: PropTypes.string,
    }),
  }).isRequired,
}

export default BusinessDetailHeader
