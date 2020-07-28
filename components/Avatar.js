import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, ViewPropTypes } from 'react-native'
import { Avatar } from 'react-native-paper'

import { useDispatch } from 'react-redux'
import { SET_FOLLOWTRAY_USER } from '../redux/actions/types'

const BSAvatar = ({ size, user, containerStyle }) => {
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

BSAvatar.defaultProps = {
  containerStyle: {},
  size: 45,
  user: null,
}

BSAvatar.propTypes = {
  containerStyle: ViewPropTypes.style,
  size: PropTypes.number,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
  }),
}

export default BSAvatar
