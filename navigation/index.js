import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import NotFoundScreen from '../screens/NotFoundScreen'
import BottomTabNavigator from './BottomTabNavigator'
import CreateStack from './CreateStack'
import GuessStack from './GuessStack'
import LinkingConfiguration from './LinkingConfiguration'

import Auth from '../screens/Auth'
import AuthLoading from '../screens/AuthLoading'
import CreateProfile from '../screens/CreateProfile'
import ZoomedImageScreen from '../screens/ZoomedImage'

import { navigationRef, isReadyRef } from './rootNavigation'

// eslint-disable-next-line react/prop-types
export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator()

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Create" component={CreateStack} />
      <Stack.Screen name="Guess" component={GuessStack} />
      <Stack.Screen name="Zoom" component={ZoomedImageScreen} />
    </Stack.Navigator>
  )
}
