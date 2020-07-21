import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DetailScreen from '../screens/PostDetail';
import FeedScreen from '../screens/Feed';
import PostCheersScreen from '../screens/PostCheers';

import BackgroundHeader from '../components/BackgroundHeader';
// import FeedSelector from '@components/FeedSelector';
import HeaderTitle from '../components/HeaderTitle';

const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={FeedScreen}
        name="Feed"
        options={{
          headerBackground: () => <BackgroundHeader />,
          headerBackTitle: null,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: 'rgba(231, 73, 62, 0.98)',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitle: () => <HeaderTitle />
        }}/>
      <Stack.Screen component={DetailScreen} name="Detail" options={({ route }) => ({
        headerBackTitleVisible: false,
        headerBackground: () => <BackgroundHeader />,
        headerStyle: {
          backgroundColor: 'rgba(231, 73, 62, 0.98)',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: '#FFFFFF',
        title: `${route.params.username}'s Post`
      })}/>
      <Stack.Screen component={PostCheersScreen} name="PostCheers" />
    </Stack.Navigator>
  );
};

export default FeedStack;
