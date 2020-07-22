import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import MyFeedScreen from '../screens/MyFeed'
import ProfileScreen from '../screens/Profile'
import PostDetail from '../screens/PostDetail'

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
        options={{ title: 'Your BarSnaps' }}
      />
      <Stack.Screen
        component={PostDetail}
        name="MyFeedDetail"
        options={{ title: 'Your BarSnap' }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
