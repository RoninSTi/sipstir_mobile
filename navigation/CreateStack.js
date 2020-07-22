import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PostSelectLocationScreen from '../screens/PostSelectLocation'
import PostAddCaptionScreen from '../screens/PostAddCaption'

import BackgroundHeader from '../components/BackgroundHeader'
import CreatePostCancelButton from '../components/CreatePostCancelButton'
import PostButton from '../components/PostButton'

const Stack = createStackNavigator()

const CreateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerLeft: () => <CreatePostCancelButton />,
        headerShown: true,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        title: `Where are you?`,
      }}>
      <Stack.Screen component={PostSelectLocationScreen} name="CreateSelectLocation" />
      <Stack.Screen
        component={PostAddCaptionScreen}
        name="CreateAddCaption"
        options={{
          headerRight: () => <PostButton />,
        }}
      />
    </Stack.Navigator>
  )
}

export default CreateStack
