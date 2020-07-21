/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux'
import { FETCH_ACTIVITY, REFRESH_ACTIVITY } from '../redux/actions/types'

import Avatar from '../components/Avatar';
import ScreenLoader from '../components/ScreenLoader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3EBEA',
    flex: 1,
  },
  item: {
    backgroundColor: '#FAF3F2',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 14,
  },
  itemDescription: {
    color: '#B7ADAB',
    fontSize: 11,
  },
  itemTitle: {
    color: '#4D423C',
    fontSize: 14,
    fontWeight: '700',
  },
  list: {
    width: Dimensions.get('window').width,
  },
});

const ActivityScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const dispatch = useDispatch()

  const activities = useSelector(state => state.activity.activities)

  const isLoading = useSelector(state => state.ui.isLoading)

  const isRefreshing = useSelector(state => state.activity.isRefreshing)

  const loading = isLoading.some(item => item.loadingType === FETCH_ACTIVITY);

  const keyExtractor = (_, index) => `activity-${index}`

  const onRefresh = () => {
    dispatch({ type: REFRESH_ACTIVITY })
  };

  const renderItem = ({ item }) => {
    const { createdAt, createdBy, message, onClick } = item;

    const description = moment(createdAt).fromNow();

    const onPress = () => {
      const { action, payload } = onClick;

      switch (action) {
        case 'postDetail':
          navigate('ActivityPostDetail', {
            postId: payload,
            username: createdBy.username,
          });
          break;
        default:
          break;
      }
    };

    return (
      <List.Item
        description={description}
        descriptionStyle={styles.itemDescription}
        left={() => <Avatar user={createdBy} />}
        onPress={onPress}
        style={styles.item}
        title={message}
        titleStyle={styles.itemTitle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScreenLoader loading={loading}>
        <FlatList
          data={activities}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#5177FF" />
          }
          renderItem={renderItem}
          style={styles.list}
        />
      </ScreenLoader>
    </View>
  );
};

export default ActivityScreen;
