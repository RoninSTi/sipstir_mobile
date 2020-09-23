import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import BusinessDetailScreen from '../screens/BusinessDetail'
import LocationDetailScreen from '../screens/LocationDetail'
import LocationFeedScreen from '../screens/LocationFeed'
import PostDetail from '../screens/PostDetail'
import RewardDetail from '../screens/RewardDetail'
import RewardSuccess from '../screens/RewardSuccess'

import BackgroundHeader from '../components/BackgroundHeader'
import CancelButton from '../components/CancelButton'
import DoneButton from '../components/DoneButton'

const Stack = createStackNavigator()

const BusinessDetailStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerShown: true,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        component={BusinessDetailScreen}
        name="BusinessDetailScreen"
        options={{
          headerLeft: () => <CancelButton />,
        }}
      />
      <Stack.Screen
        component={LocationDetailScreen}
        name="LocationDetailScreen"
        options={{
          headerLeft: () => <CancelButton />,
        }}
      />
      <Stack.Screen
        component={LocationFeedScreen}
        name="LocationFeed"
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        component={PostDetail}
        name="LocationFeedDetail"
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        component={RewardDetail}
        name="RewardDetail"
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        component={RewardSuccess}
        name="RewardSuccess"
        options={{
          headerLeft: null,
          headerRight: () => <DoneButton />,
        }}
      />
    </Stack.Navigator>
  )
}

export default BusinessDetailStack
