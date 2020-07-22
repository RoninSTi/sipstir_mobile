import React from 'react'

import { useDispatch } from 'react-redux'
import { SET_IS_GUESSING } from '../redux/actions/types'

import CancelButton from './CancelButton'

const CreateGuessCancelButton = () => {
  const dispatch = useDispatch()

  const handleOnPress = () => {
    dispatch({ type: SET_IS_GUESSING, payload: false })
  }

  return <CancelButton onPress={handleOnPress} />
}

export default CreateGuessCancelButton
