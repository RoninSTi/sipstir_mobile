import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Keyboard } from 'react-native'
import { Button } from 'react-native-paper'
import { createGuessAction } from '../redux/actions/guess'
import { CREATE_GUESS } from '../redux/actions/types'

const GuessButton = () => {
  const dispatch = useDispatch()

  const postId = useSelector((state) => state.createGuess.postId)

  const placeId = useSelector((state) => state.createGuess.location?.placeId)

  const { id: createdById, token } = useSelector((state) => state.auth.user)

  const text = useSelector((state) => state.createGuess.text)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const loading = isLoading.some((item) => item.loadingType === CREATE_GUESS)

  const onPress = () => {
    Keyboard.dismiss()

    dispatch(createGuessAction({ createdById, placeId, postId, text, token }))
  }

  return (
    <Button
      color="#FFFFFF"
      disabled={loading}
      labelStyle={{ fontSize: 18 }}
      loading={loading}
      onPress={onPress}
      uppercase={false}>
      Guess
    </Button>
  )
}

export default GuessButton
