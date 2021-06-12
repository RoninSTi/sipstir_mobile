/* eslint-disable global-require */
import React, { useCallback, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { View } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import CaptionInput from '../components/CaptionInput'
import PlacesList from '../components/PlacesList'
import { CHECK_LOCATION, SET_PLACES_SEARCH_STRING, SELECT_PLACE } from '../redux/actions/types'

const PostSelectLocationScreen = () => {
  const dispatch = useDispatch()

  const [searchString, setSearchString] = useState('')

  const places = useSelector((state) => state.places.places)

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: CHECK_LOCATION,
      })
    }, [dispatch])
  )

  const handleOnChangeText = (text) => {
    setSearchString(text)

    dispatch({ type: SET_PLACES_SEARCH_STRING, payload: text })
  }

  const onPressListItem = async ({ place }) => {
    dispatch({ type: SELECT_PLACE, payload: place.place_id })
  }

  return (
    <View style={{ flex: 1 }}>
      <PlacesList onPressListItem={onPressListItem} places={places} />
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

export default PostSelectLocationScreen
