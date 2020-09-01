import React from 'react'
import PropTypes from 'prop-types'

import { Animated, View, Platform } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { SET_SHOULD_SCROLL_UP } from '../redux/actions/types'

import CreatePostButton from './CreatePostButton'
import Tab from './Tab'

const TabBar = ({ descriptors, navigation, state }) => {
  const dispatch = useDispatch()

  const currentRouteName = useSelector((reduxState) => reduxState.nav.currentRouteName)

  const position = new Animated.Value(state.index)

  const onPress = (key) => {
    const { navigate, popToTop } = navigation

    if (key.startsWith('Activity')) {
      if (currentRouteName === 'ActivityPostDetail') {
        popToTop()
      } else {
        navigate('Activity')
      }
    }

    if (key.startsWith('Feed')) {
      if (currentRouteName === 'Feed') {
        dispatch({ type: SET_SHOULD_SCROLL_UP, payload: true })
      } else {
        navigate('Feed')
      }
    }

    if (key.startsWith('Leaderboard')) {
      navigate('Leaderboard')
    }

    if (key.startsWith('Profile')) {
      switch (currentRouteName) {
        case 'Following':
        case 'ActivityScreen':
        case 'Followers':
        case 'MyFeedScreen':
        case 'ActivityPostDetail':
        case 'MyFeedDetail':
          popToTop()
          break
        default:
          navigate('Profile')
      }
    }

    if (key.startsWith('Rewards')) {
      if (currentRouteName === 'RewardDetailScreen') {
        popToTop()
      } else {
        navigate('Rewards')
      }
    }
  }

  const paddingBottom = Platform.select({
    android: 0,
    ios: 20,
  })

  return (
    <View
      style={{
        height: 70,
        backgroundColor: 'rgba(231, 73, 62, 0.96)',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom,
      }}>
      {state.routes.map((route, idx) => {
        const { options } = descriptors[route.key]
        const label =
          // eslint-disable-next-line no-nested-ternary
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name
        const focusAnim = position.interpolate({
          inputRange: [idx - 2, idx - 1, idx, idx + 1, idx + 1],
          outputRange: [0, 0, 1, 0, 0],
        })

        if (route.key.startsWith('CreatePost')) {
          return <CreatePostButton key={route.key} />
        }
        return (
          <Tab
            focusAnim={focusAnim}
            key={route.key}
            routeKey={route.key}
            title={label}
            onPress={() => onPress(route.key)}
          />
        )
      })}
    </View>
  )
}

TabBar.propTypes = {
  descriptors: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    popToTop: PropTypes.func,
  }).isRequired,
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default TabBar
