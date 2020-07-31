import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { Animated, Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'

import { useDispatch } from 'react-redux'
import { SET_FEED_TYPE } from '../redux/actions/types'

const { width } = Dimensions.get('window')

const METRICS = {
  buttonHeight: 54,
  buttonWidth: (width - 28) / 2,
  containerHeight: 55,
  containerWidth: width - 28,
  containerBorderRadius: 55 / 2,
  sliderWidth: (width - 30) / 2,
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    height: METRICS.buttonHeight,
    justifyContent: 'center',
    width: METRICS.buttonWidth,
  },
  buttonTitle: {
    color: '#979797',
    fontSize: 15,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F3EBEA',
    borderRadius: METRICS.containerBorderRadius,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'center',
    width: METRICS.containerWidth,
  },
  switcher: {
    alignItems: 'center',
    backgroundColor: 'rgba(231, 73, 62, 0.98)',
    borderRadius: 53 / 2,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'center',
    left: 1,
    position: 'absolute',
    width: METRICS.sliderWidth,
    top: 1,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
})

const FeedSelector = ({ offsetY }) => {
  const dispatch = useDispatch()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const index = useRef(new Animated.Value(0)).current

  const clampedOffsetY = offsetY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  })

  // const headerTranslate = Animated.diffClamp(clampedOffsetY, 0, 83).interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, -1],
  // })

  const headerOpacity = clampedOffsetY.interpolate({
    inputRange: [0, 83],
    outputRange: [1, 0],
  })

  const position = index.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1 + METRICS.sliderWidth],
  })

  const handleOnPress = (idx) => {
    setSelectedIndex(idx)

    dispatch({ type: SET_FEED_TYPE, payload: idx === 0 ? 'main' : 'following' })

    Animated.spring(index, {
      toValue: idx,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: headerOpacity },
        // { transform: [{ translateY: headerTranslate }], opacity: headerOpacity },
      ]}>
      <View style={styles.container}>
        <Animated.View style={[styles.switcher, { left: position }]} />
        <FeedButton
          selected={selectedIndex === 0}
          onPress={() => handleOnPress(0)}
          title="Global"
        />
        <FeedButton
          selected={selectedIndex === 1}
          onPress={() => handleOnPress(1)}
          title="Following"
        />
      </View>
    </Animated.View>
  )
}

FeedSelector.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  offsetY: PropTypes.any.isRequired,
}

const FeedButton = ({ selected, onPress, title }) => {
  const index = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(index, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
    }).start()
  }, [selected])

  const color = index.interpolate({
    inputRange: [0, 1],
    outputRange: ['#979797', '#FFFFFF'],
  })

  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={1}>
      <Animated.Text style={[styles.buttonTitle, { color }]}>{title}</Animated.Text>
    </TouchableOpacity>
  )
}

FeedButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default FeedSelector
