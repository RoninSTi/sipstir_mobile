import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ActivityScreen from '../screens/Activity';
import ActivityPostDetail from '../screens/PostDetail';

import BackgroundHeader from '../components/BackgroundHeader';

const Stack = createStackNavigator();

const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ActivityScreen} name="ActivityScreen" options={{
        headerBackground: () => <BackgroundHeader />,
        headerBackTitle: null,
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        title: 'Activity',
      }} />
      <Stack.Screen component={ActivityPostDetail} name="ActivityPostDetail" options={({ route }) => ({
        headerBackTitleVisible: false,
        headerBackground: () => <BackgroundHeader />,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        title: `${route.params.username}'s Post`
      })} />
    </Stack.Navigator>
  );
};

export default ActivityStack;
