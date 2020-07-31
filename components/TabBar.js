import React from 'react'
import PropTypes from 'prop-types'

import { Animated, View, Platform } from 'react-native'

import CreatePostButton from './CreatePostButton'
import Tab from './Tab'

const TabBar = ({ descriptors, navigation, state }) => {
  // const { setShouldScrollUp } = feedStore;

  // const index = useNavigationState(state => state.index);

  // const routes = useNavigationState(state => state.routes)

  // const state = useNavigationState(state => state)

  const position = new Animated.Value(state.index)

  const onPress = (key) => {
    const { navigate } = navigation

    if (key.startsWith('Activity')) {
      navigate('Activity')
    }

    if (key.startsWith('Feed')) {
      navigate('Feed')
    }

    if (key.startsWith('Leaderboard')) {
      navigate('Leaderboard')
    }

    if (key.startsWith('Profile')) {
      navigate('Profile')
    }

    // const feedRoute = navigation.state.routes.find(route => route.routeName === 'FeedStack');

    // const activityRoute = navigation.state.routes.find(
    //   route => route.routeName === 'ActivityStack'
    // );

    // switch (routeName) {
    //   case 'FeedStack':
    //     if (feedRoute.index > 0) {
    //       popToTop();
    //       break;
    //     }

    //     if (navigation.state.index === 0) {
    //       setShouldScrollUp(true);
    //     }

    //     navigate(routeName);
    //     break;
    //   case 'ActivityStack':
    //     if (activityRoute.index > 0) {
    //       popToTop();
    //       break;
    //     }
    //     navigate(routeName);
    //     break;
    //   default:
    //     navigate(routeName);
    //     break;
    // }
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
    navigate: PropTypes.func,
  }).isRequired,
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default TabBar
