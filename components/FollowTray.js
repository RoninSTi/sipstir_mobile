import React, { useEffect, useMemo, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import { useDispatch, useSelector } from 'react-redux'
import { BLOCK_USER, FOLLOW_USER, CLOSE_FOLLOWTRAY } from '../redux/actions/types'
import { blockUserAction } from '../redux/actions/blocked'
import { followUserAction } from '../redux/actions/user'

import Avatar from './Avatar'

const HEIGHT = 325

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  header: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
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

  const bottomSheetRef = useRef(null)

  const snapPoints = useMemo(() => [HEIGHT], [])

  const isVisible = useSelector((state) => state.followTray.isVisible)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const user = useSelector((state) => state.followTray.user)

  const me = useSelector((state) => state.user)

  const authUser = useSelector((state) => state.auth.user)

  const isTryingToFollow = isLoading.some((element) => {
    return element.loadingType === FOLLOW_USER && element.meta === user?.id
  })

  const isTryingToBlock = isLoading.some(
    ({ loadingType, meta }) => loadingType === BLOCK_USER && meta === user?.id
  )

  const isFollowing = me.following.some((follower) => follower.id === user?.id)

  const isBlocked = useSelector((state) =>
    state.blocked.blockedUsers.some(({ id, blocked }) => id === user?.id && blocked)
  )

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current.expand()
    } else {
      bottomSheetRef.current.close()
    }
  }, [bottomSheetRef, isVisible])

  const handleOnCancel = () => {
    dispatch({ type: CLOSE_FOLLOWTRAY })
  }

  const handleOnPressFollow = () => {
    dispatch(followUserAction({ followingId: user?.id, token: authUser?.token, userId: me?.id }))
  }

  const handleOnPressBlock = () => {
    dispatch(blockUserAction({ blockedId: user?.id, token: authUser?.token }))
  }

  const renderContent = () => (
    <BottomSheetView style={styles.container}>
      <View style={styles.header}>
        <Avatar size={100} user={user} />
        <Text style={styles.username}>{user?.username}</Text>
        {me?.id !== user?.id && (
          <>
            <Button
              buttonColor="#5177FF"
              compact
              loading={isTryingToFollow}
              mode="contained"
              onPress={handleOnPressFollow}
              style={{ width: '100%' }}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button
              buttonColor="#5177FF"
              compact
              loading={isTryingToBlock}
              mode="contained"
              onPress={handleOnPressBlock}
              style={{ marginTop: 8, width: '100%' }}>
              {isBlocked ? 'Unblock' : 'Block'}
            </Button>
          </>
        )}
      </View>
      <View style={{ height: 50, justifyContent: 'center', width: '100%' }}>
        <Button
          textColor="#979797"
          compact
          labelStyle={{ color: '#FFFFFF' }}
          mode="contained"
          onPress={handleOnCancel}
          style={{ width: '100%' }}>
          Cancel
        </Button>
      </View>
    </BottomSheetView>
  )

  return (
    <BottomSheet ref={bottomSheetRef} enablePanDownToClose index={-1} snapPoints={snapPoints}>
      {renderContent()}
    </BottomSheet>
  )
}

export default FollowTray
