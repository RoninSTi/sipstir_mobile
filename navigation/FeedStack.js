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
    <Stack.Navigator screenOptions={{
      headerBackground: () => <BackgroundHeader />,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: 'rgba(231, 73, 62, 0.98)',
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerBackTitleVisible: false,
      headerTintColor: '#FFFFFF',
    }}>
      <Stack.Screen
        component={FeedScreen}
        name="Feed"
        options={{
          headerLeft: () => null,
          headerTitle: () => <HeaderTitle />
        }}/>
      <Stack.Screen component={DetailScreen} name="Detail" options={({ route }) => ({
        title: `${route.params.username}'s BarSnap`
      })}/>
      <Stack.Screen component={PostCheersScreen} name="PostCheers" options={{
        title: 'Cheers'
      }} />
    </Stack.Navigator>
  );
};

export default FeedStack;
