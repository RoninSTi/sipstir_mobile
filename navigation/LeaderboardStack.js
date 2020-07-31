import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import LeaderboardScreen from '../screens/Leaderboard'

import BackgroundHeader from '../components/BackgroundHeader'

const Stack = createStackNavigator()

const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LeaderboardScreen}
        name="Leaderboard"
        options={{
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
          title: 'Leaderboard',
        }}
      />
    </Stack.Navigator>
  )
}

export default ActivityStack
