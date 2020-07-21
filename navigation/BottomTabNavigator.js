import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import ActivityStack from './ActivityStack'
import Empty from '../components/Empty'
import FeedStack from './FeedStack';
import LeaderboardStack from './LeaderboardStack'
import ProfileStack from './ProfileStack'

import TabBar from '../components/TabBar'

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      tabBar={props => <TabBar {...props} />}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Feed"
        component={FeedStack}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityStack}
      />
      <BottomTab.Screen
        name="CreatePost"
        component={Empty}
      />
      <BottomTab.Screen
        name="Leaderboard"
        component={LeaderboardStack}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
      />
    </BottomTab.Navigator>
  );
}