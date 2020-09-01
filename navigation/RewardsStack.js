import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import RewardDetailScreen from '../screens/RewardDetail'
import RewardsScreen from '../screens/Rewards'

import BackgroundHeader from '../components/BackgroundHeader'

const Stack = createStackNavigator()

const RewardsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        component={RewardsScreen}
        name="RewardsScreen"
        options={{
          title: 'Rewards',
        }}
      />
      <Stack.Screen
        component={RewardDetailScreen}
        name="RewardDetailScreen"
        options={{
          title: 'Reward',
        }}
      />
    </Stack.Navigator>
  )
}

export default RewardsStack
