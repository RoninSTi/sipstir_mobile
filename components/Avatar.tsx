import React from 'react'

import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'

import { useDispatch } from 'react-redux'
import { SET_FOLLOWTRAY_USER } from '../redux/actions/types'
import { User } from '../types'

type Props = {
  containerStyle: object;
  size: number;
  user?: User;
}

const BSAvatar: React.FC<Props> = ({ size = 45, user, containerStyle = {} }) => {
  const dispatch = useDispatch()

  const avatar = user?.avatar

  const username = user?.username

  if (!avatar || !username) return null

  const handleOnPress = () => {
    dispatch({ type: SET_FOLLOWTRAY_USER, payload: user })
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleOnPress}>
      {avatar ? (
        <Avatar.Image size={size} source={{ uri: avatar }} style={containerStyle} />
      ) : (
        <Avatar.Text size={size} label={username[0]} style={containerStyle} />
      )}
    </TouchableOpacity>
  )
}

export default BSAvatar
