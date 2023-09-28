import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Keyboard } from 'react-native'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import { createGuessAction } from '../redux/actions/guess'
import { CREATE_GUESS } from '../redux/actions/types'

const GuessButton = () => {
  const dispatch = useDispatch()

  const postId = useSelector((state) => state.createGuess.postId)

  const placeId = useSelector((state) => state.createGuess.location?.placeId)

  const { id: createdById, token } = useSelector((state) => state.auth.user)

  const text = useSelector((state) => state.createGuess.text)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const loading = isLoading.some(({ loadingType }) => loadingType === CREATE_GUESS)

  const handleOnPress = () => {
    Keyboard.dismiss()

    if (loading) return

    dispatch(createGuessAction({ createdById, placeId, postId, text, token }))
  }

  return loading ? (
    <ActivityIndicator color="#FFFFFF" size={24} style={{ marginRight: 10 }} />
  ) : (
    <IconButton
      iconColor="#FFFFFF"
      icon="map-marker-question-outline"
      size={24}
      onPress={handleOnPress}
    />
  )
}

export default GuessButton
