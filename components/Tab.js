/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, View } from 'react-native';

const Tab = ({ focusAnim, routeKey, onPress }) => {
  const icon = () => {
      if (routeKey.startsWith('Activity')) 
        return (
          <Animated.Image
            style={{
              width: 32,
              height: 28,
              tintColor: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 0.6)', '#FFFFFF'],
              }),
            }}
            source={require('../assets/images/tab_icon_activity.png')}
          />
        );
      if (routeKey.startsWith('Feed'))
        return (
          <Animated.Image
            style={{
              width: 38,
              height: 30,
              tintColor: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 0.6)', '#FFFFFF'],
              }),
            }}
            source={require('../assets/images/tab_icon_feed.png')}
          />
        );
      if  (routeKey.startsWith('Leaderboard'))
        return (
          <Animated.Image
            style={{
              width: 33,
              height: 30,
              tintColor: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 0.6)', '#FFFFFF'],
              }),
            }}
            source={require('../assets/images/tab_icon_leaderboard.png')}
          />
        );
    //   case 'ProfileStack':
    //     return (
    //       <Animated.Image
    //         style={{
    //           width: 28,
    //           height: 28,
    //           tintColor: focusAnim.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: ['rgba(255, 255, 255, 0.6)', '#FFFFFF'],
    //           }),
    //         }}
    //         source={require('../assets/images/tab_icon_profile.png')}
    //       />
    //     );
    //   default:
    //     return null;
    // }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 10 }}>{icon()}</View>
    </TouchableOpacity>
  );
};

Tab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  focusAnim: PropTypes.any.isRequired,
  routeKey: PropTypes.string.isRequired,
  // onPress: PropTypes.func.isRequired,
};

export default Tab;
