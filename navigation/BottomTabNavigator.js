import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

import Empty from '../components/Empty'
import FeedStack from './FeedStack'
import LeaderboardStack from './LeaderboardStack'
import ProfileStack from './ProfileStack'
import RewardsStack from './RewardsStack'

import TabBar from '../components/TabBar'

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      // eslint-disable-next-line react/jsx-props-no-spreading
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <BottomTab.Screen name="FeedStack" component={FeedStack} />
      <BottomTab.Screen name="Rewards" component={RewardsStack} />
      <BottomTab.Screen name="CreatePost" component={Empty} />
      <BottomTab.Screen name="Leaderboard" component={LeaderboardStack} />
      <BottomTab.Screen name="Profile" component={ProfileStack} />
    </BottomTab.Navigator>
  )
}
