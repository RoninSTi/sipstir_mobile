import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import ActivityScreen from '../screens/Activity'
import BlockedScreen from '../screens/Blocked'
import FollowersScreen from '../screens/Followers'
import FollowingScreen from '../screens/Following'
import MyFeedScreen from '../screens/MyFeed'
import PostDetail from '../screens/PostDetail'
import ProfileScreen from '../screens/Profile'
import RewardRedemptionsScreen from '../screens/RewardRedemptions'

import BackgroundHeader from '../components/BackgroundHeader'

const Stack = createStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{
          headerLeft: () => null,
          title: 'Your Profile',
        }}
      />
      <Stack.Screen
        component={MyFeedScreen}
        name="MyFeedScreen"
        options={{ title: 'Your Posts' }}
      />
      <Stack.Screen component={PostDetail} name="MyFeedDetail" options={{ title: 'Your Post' }} />
      <Stack.Screen
        component={ActivityScreen}
        name="ActivityScreen"
        options={{
          title: 'Activity',
        }}
      />
      <Stack.Screen component={PostDetail} name="ActivityPostDetail" />
      <Stack.Screen component={FollowersScreen} name="Followers" options={{ title: 'Followers' }} />
      <Stack.Screen component={FollowingScreen} name="Following" options={{ title: 'Following' }} />
      <Stack.Screen component={BlockedScreen} name="Blocked" options={{ title: 'Blocked' }} />
      <Stack.Screen
        component={RewardRedemptionsScreen}
        name="RewardRedemptionsScreen"
        options={{ title: 'Reward Redemptions' }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
