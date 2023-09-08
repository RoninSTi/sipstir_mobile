import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { SET_CURRENT_ROUTE_NAME } from '../redux/actions/types'

import BottomTabNavigator from './BottomTabNavigator'
import BusinessDetailStack from './BusinessDetailStack'
import CreateStack from './CreateStack'
import GuessStack from './GuessStack'
import EditProfileStack from './EditProfileStack'
import LinkingConfiguration from './LinkingConfiguration'

import Auth from '../screens/Auth'
import AuthEmail from '../screens/AuthEmail'
import AuthLoading from '../screens/AuthLoading'
import AuthRegister from '../screens/AuthRegister'
import CreateProfile from '../screens/CreateProfile'
import ZoomedImageScreen from '../screens/ZoomedImage'

import { navigationRef, isReadyRef } from './rootNavigation'

// eslint-disable-next-line react/prop-types
export default function Navigation({ colorScheme }) {
  const dispatch = useDispatch()

  const routeNameRef = React.useRef()

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.current.getCurrentRoute().name

        if (previousRouteName !== currentRouteName) {
          dispatch({ type: SET_CURRENT_ROUTE_NAME, payload: currentRouteName })
        }

        routeNameRef.current = currentRouteName
      }}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="AuthEmail" component={AuthEmail} />
      <Stack.Screen name="AuthRegister" component={AuthRegister} />
    </Stack.Navigator>
  )
}

function MainNavigator() {
  const isLoading = useSelector((state) => state.auth.isLoading)

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  if (isLoading) return <AuthLoading />

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Business" component={BusinessDetailStack} />
      <Stack.Screen name="Create" component={CreateStack} />
      <Stack.Screen name="Guess" component={GuessStack} />
      <Stack.Screen name="Zoom" component={ZoomedImageScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileStack} />
    </Stack.Navigator>
  )
}
