import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import GuessSelectLocationScreen from '../screens/GuessSelectLocation'
import GuessAddCommentScreen from '../screens/GuessAddComment'

import BackgroundHeader from '../components/BackgroundHeader'
import CreateGuessCancelButton from '../components/CreateGuessCancelButton'

import GuessButton from '../components/GuessButton'

const Stack = createStackNavigator()

const GuessStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerLeft: () => <CreateGuessCancelButton />,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
      }}>
      <Stack.Screen component={GuessSelectLocationScreen} name="GuessSelectLocation" />
      <Stack.Screen
        component={GuessAddCommentScreen}
        name="GuessAddComment"
        options={{
          headerRight: () => <GuessButton />,
        }}
      />
    </Stack.Navigator>
  )
}

export default GuessStack
