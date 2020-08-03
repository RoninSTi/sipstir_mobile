import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { Animated, Dimensions, StyleSheet, View, TouchableOpacity, Platform } from 'react-native'

import { useDispatch } from 'react-redux'
import { SET_FEED_TYPE } from '../redux/actions/types'

const { width } = Dimensions.get('window')

const METRICS = {
  buttonHeight: 54,
  buttonWidth: (width - 28) / 3,
  containerHeight: 55,
  containerWidth: width - 28,
  containerBorderRadius: 55 / 2,
  sliderWidth: (width - 30) / 3,
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
    flexDirection: 'row',
    height: 55,
    justifyContent: 'center',
    width: METRICS.containerWidth,
  },
  switcher: {
    alignItems: 'center',
    backgroundColor: 'rgba(231, 73, 62, 0.98)',
    borderRadius: 40 / 2,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: METRICS.sliderWidth,
    top: 7.5,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#D2CAC9',
    justifyContent: 'center',
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
    inputRange: [0, 1, 2],
    outputRange: [0, METRICS.sliderWidth, 2 * METRICS.sliderWidth],
  })

  const handleOnPress = (idx) => {
    setSelectedIndex(idx)

    let feedType = 'main'

    switch (idx) {
      case 1:
        feedType = 'following'
        break
      case 2:
        feedType = 'nearby'
        break
      default:
        break
    }

    dispatch({ type: SET_FEED_TYPE, payload: feedType })

    Animated.spring(index, {
      toValue: idx,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Animated.View
      style={[styles.wrapper, Platform.OS === 'ios' ? { opacity: headerOpacity } : {}]}>
      <View style={styles.container}>
        <Animated.View style={[styles.switcher, { left: position }]} />
        <FeedButton
          selected={selectedIndex === 0}
          onPress={() => handleOnPress(0)}
          title="Everyone"
        />
        <FeedButton
          selected={selectedIndex === 1}
          onPress={() => handleOnPress(1)}
          title="Friends"
        />
        <FeedButton
          selected={selectedIndex === 2}
          onPress={() => handleOnPress(2)}
          title="Nearby"
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
