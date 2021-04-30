import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'

import { IconButton } from 'react-native-paper'
import { updateUserAction } from '../redux/actions/user'

const SaveProfileButton = () => {
  const { dangerouslyGetParent } = useNavigation()

  const dispatch = useDispatch()

  const buttonDisabled = useSelector((state) => {
    const { isAvailable, username: un } = state.createProfile

    return !isAvailable || un.length === 0
  })

  const username = useSelector((state) => state.createProfile.username)

  const avatar = useSelector((state) => state.createProfile.avatar)

  const authUser = useSelector((state) => state.auth.user)

  const handleOnPress = () => {
    dangerouslyGetParent()?.goBack()

    dispatch(updateUserAction({ userId: authUser.id, avatar, token: authUser.token, username }))
  }

  return (
    <IconButton
      color="#FFFFFF"
      disabled={buttonDisabled}
      icon="content-save-outline"
      size={24}
      onPress={handleOnPress}
    />
  )
}

export default SaveProfileButton
