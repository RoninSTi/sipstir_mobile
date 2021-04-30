import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import CreateProfileScreen from '../screens/CreateProfile'

import BackgroundHeader from '../components/BackgroundHeader'
import CancelButton from '../components/CancelButton'
import SaveProfileButton from '../components/SaveProfileButton'

const Stack = createStackNavigator()

const EditProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerLeft: () => <CancelButton />,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        component={CreateProfileScreen}
        name="EditProfileScreen"
        options={{
          headerRight: () => <SaveProfileButton />,
          title: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  )
}

export default EditProfileStack
