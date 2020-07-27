import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'

import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_USER, CLOSE_FOLLOWTRAY } from '../redux/actions/types'
import { followUserAction } from '../redux/actions/user'

import Avatar from './Avatar'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  username: {
    color: '#434343',
    marginVertical: 7,
    fontSize: 13,
    fontWeight: '700',
  },
})

const FollowTray = () => {
  const dispatch = useDispatch()

  const refRBSheet = useRef()

  const isVisible = useSelector((state) => state.followTray.isVisible)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const user = useSelector((state) => state.followTray.user)

  const me = useSelector((state) => state.user)

  const authUser = useSelector((state) => state.auth.user)

  const isTryingToFollow = isLoading.some((element) => {
    return element.loadingType === FOLLOW_USER && element.meta === user?.id
  })

  const isFollowing = me.following.some((follower) => follower.id === user?.id)

  useEffect(() => {
    if (isVisible) {
      refRBSheet.current.open()
    } else {
      refRBSheet.current.close()
    }
  }, [isVisible, refRBSheet])

  const handleOnCancel = () => {
    dispatch({ type: CLOSE_FOLLOWTRAY })
  }

  const handleOnClose = () => {
    dispatch({ type: CLOSE_FOLLOWTRAY })
  }

  const handleOnPress = () => {
    dispatch(followUserAction({ followingId: user?.id, token: authUser?.token, userId: me?.id }))
  }

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown
      closeOnPressMask
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
      height={275}
      onClose={handleOnClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar size={100} user={user} />
          <Text style={styles.username}>{user?.username}</Text>
          {me?.id !== user?.id && (
            <Button
              color="#5177FF"
              compact
              loading={isTryingToFollow}
              mode="contained"
              onPress={handleOnPress}
              style={{ width: '100%' }}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </View>
        <View style={{ height: 50, justifyContent: 'center', width: '100%' }}>
          <Button
            color="#979797"
            compact
            labelStyle={{ color: '#FFFFFF' }}
            mode="contained"
            onPress={handleOnCancel}
            style={{ width: '100%' }}>
            Cancel
          </Button>
        </View>
      </View>
    </RBSheet>
  )
}

export default FollowTray
