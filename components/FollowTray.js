import React, { useEffect, useRef } from 'react'
import { View, Button } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'

import { useDispatch, useSelector } from 'react-redux'

import Avatar from './Avatar'
import { CLOSE_FOLLOWTRAY } from '../redux/actions/types'

const FollowTray = () => {
  const dispatch = useDispatch()

  const refRBSheet = useRef()

  const isVisible = useSelector((state) => state.followTray.isVisible)

  const user = useSelector((state) => state.followTray.user)

  useEffect(() => {
    if (isVisible) {
      refRBSheet.current.open()
    } else {
      refRBSheet.current.close()
    }
  }, [isVisible, refRBSheet])

  const handleOnClose = () => {
    dispatch({ type: CLOSE_FOLLOWTRAY })
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
      onClose={handleOnClose}>
      <View>
        <Avatar user={user} />
      </View>
    </RBSheet>
  )
}

export default FollowTray
