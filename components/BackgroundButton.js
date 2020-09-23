import React from 'react'
import PropTypes from 'prop-types'

import { ImageBackground, StyleSheet, TouchableOpacity, Text, ViewPropTypes } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: '#5177FF',
    borderRadius: 20,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    overflow: 'hidden',
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
})

const BackgroundButton = ({
  containerStyle,
  disabled,
  icon,
  isLoading,
  onPress,
  source,
  title,
}) => {
  const showIcon = icon && !isLoading

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <ImageBackground source={source} style={styles.background}>
        {showIcon && icon()}
        {isLoading && <ActivityIndicator color="#FFFFFF" size={20} style={{ marginRight: 7 }} />}
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

BackgroundButton.defaultProps = {
  containerStyle: {},
  disabled: false,
  icon: () => {},
  isLoading: false,
  onPress: () => {},
  title: '',
}

BackgroundButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  icon: PropTypes.func,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  source: PropTypes.number.isRequired,
  title: PropTypes.string,
}

export default BackgroundButton
