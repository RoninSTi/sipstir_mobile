/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import PropTypes from 'prop-types'

import { FlatList, StyleSheet, View } from 'react-native'
import { Button, List } from 'react-native-paper'

import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_USER } from '../redux/actions/types'
import { followUserAction } from '../redux/actions/user'

import Avatar from './Avatar'

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    color: '#434343',
    fontWeight: '700',
  },
})

const UsersList = ({ users, ListEmptyComponent }) => {
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.auth.user)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const user = useSelector((state) => state.user)

  const keyExtractor = (item) => `cheers-${item.id}`

  const onPress = (item) => {
    dispatch(
      followUserAction({
        followingId: item.id,
        userId: authUser.id,
        token: authUser.token,
      })
    )
  }

  const renderItem = ({ item }) => {
    const isTryingToFollow = isLoading.some((element) => {
      return element.loadingType === FOLLOW_USER && element.meta === item.id
    })

    const isFollowing = user.following.some((follower) => follower.id === item.id)

    return (
      <List.Item
        left={() => <Avatar user={item} />}
        right={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {item.id !== user.id && (
              <Button
                color="#5177FF"
                compact
                loading={isTryingToFollow}
                mode="contained"
                onPress={() => {
                  onPress(item)
                }}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </View>
        )}
        style={styles.listItem}
        title={item.username}
        titleStyle={styles.title}
      />
    )
  }

  renderItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
  }

  return (
    <FlatList
      data={users}
      extraData={[isLoading]}
      keyExtractor={keyExtractor}
      ListEmptyComponent={() => <ListEmptyComponent />}
      renderItem={renderItem}
    />
  )
}

UsersList.propTypes = {
  ListEmptyComponent: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    })
  ).isRequired,
}

export default UsersList
