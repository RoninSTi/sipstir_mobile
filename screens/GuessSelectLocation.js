/* eslint-disable global-require */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { useFocusEffect } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'

import { View } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { CHECK_LOCATION, SELECT_PLACE, SET_PLACES_SEARCH_STRING } from '../redux/actions/types'

import CaptionInput from '../components/CaptionInput'
import PlacesList from '../components/PlacesList'

const GuessSelectLocationScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [searchString, setSearchString] = useState('')

  const postId = useSelector((state) => state.createGuess.postId)

  const post = useSelector((state) => state.feed.posts.find((p) => p.id === postId))

  const places = useSelector((state) => state.places.places)

  const { navigate } = navigation

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: CHECK_LOCATION,
        payload: {
          includeNoIdea: true,
        },
      })
    }, [])
  )

  if (!post) return null

  const onPressListItem = async ({ place }) => {
    if (place.type === 'NO_GUESS') {
      navigate('GuessAddComment', { username: post.createdBy.username })
    } else {
      dispatch({ type: SELECT_PLACE, payload: place.place_id })
    }
  }

  const handleOnChangeText = (text) => {
    setSearchString(text)

    dispatch({ type: SET_PLACES_SEARCH_STRING, payload: text })
  }

  return (
    <View style={{ flex: 1 }}>
      <PlacesList includeNoIdea onPressListItem={onPressListItem} places={places} />
      <CaptionInput
        autoFocus
        backgroundColor="#F3EBEA"
        hideButton
        onChangeText={handleOnChangeText}
        placeholder="Search for a spot..."
        value={searchString}
      />
      <KeyboardSpacer />
    </View>
  )
}

GuessSelectLocationScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}

export default GuessSelectLocationScreen
