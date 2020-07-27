/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'

import { Image, StyleSheet, Text, View, ViewPropTypes } from 'react-native'

const styles = StyleSheet.create({
  backgroundImage: {
    bottom: 0,
    height: 90,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 90,
  },
  container: {
    alignItems: 'center',
    height: 90,
    justifyContent: 'center',
    width: 90,
  },
  icon: {
    height: 42,
    marginBottom: 7,
    width: 52,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
})

const PointsIcon = ({ containerStyle, label }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={require('../assets/images/icon_points_bg.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.innerContainer}>
        <Image source={require('../assets/images/tab_icon_feed.png')} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  )
}

PointsIcon.defaultProps = {
  containerStyle: {},
}

PointsIcon.propTypes = {
  containerStyle: ViewPropTypes.style,
  label: PropTypes.string.isRequired,
}

export default PointsIcon
