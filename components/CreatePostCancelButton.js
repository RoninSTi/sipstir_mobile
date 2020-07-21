import React from 'react'

import { useDispatch } from 'react-redux'
import { SET_IS_CREATING_POST } from '../redux/actions/types'

import CancelButton from './CancelButton'

const CreatePostCancelButton = () => {
  const dispatch = useDispatch()

  const handleOnPress = () => {
    dispatch({ type: SET_IS_CREATING_POST, payload: false })
  }

  return <CancelButton onPress={handleOnPress} />
}

export default CreatePostCancelButton