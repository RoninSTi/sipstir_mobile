/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, List } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_USER } from '../redux/actions/types'
import { followUserAction } from '../redux/actions/user'

import Avatar from './Avatar';

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontWeight: '700',
  },
});

const PostCheersList = ({ cheers }) => {
  const dispatch = useDispatch();

  const authUser = useSelector(state => state.auth.user)

  const isLoading = useSelector(state => state.ui.isLoading)

  const user = useSelector(state => state.user)

  const keyExtractor = item => `cheers-${item.id}`;

  const onPress = item => {
    dispatch(followUserAction({ followingId: item.createdBy.id, userId: authUser.id, token: authUser.token }))
  };

  const renderItem = ({ item }) => {
    const isTryingToFollow = isLoading.some(element => {
      return element.loadingType === FOLLOW_USER && element.meta === item.createdBy.id;
    });

    const isFollowing = user.following.some(follower => follower.id === item.createdBy.id);

    return (
      <List.Item
        left={() => <Avatar user={item.createdBy} />}
        right={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {item.createdBy.id !== user.id && (
              <Button
                color="#5177FF"
                loading={isTryingToFollow}
                mode="contained"
                onPress={() => {
                  onPress(item);
                }}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </View>
        )}
        style={styles.listItem}
        title={item.createdBy.username}
        titleStyle={styles.title}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      createdBy: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
      }),
    }).isRequired,
  };

  return (
    <FlatList
      contentContainerStyle={{ flex: 1 }}
      data={cheers}
      extraData={[isLoading]}
      keyExtractor={keyExtractor}
      ListEmptyComponent={() => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>No 🍻 yet!</Text>
        </View>
      )}
      renderItem={renderItem}
    />
  );
};

export default PostCheersList;
