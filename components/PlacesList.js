/* eslint-disable react/prop-types */
import React from 'react'

import { FlatList } from 'react-native'

import { useSelector } from 'react-redux'
import { FETCH_PLACES } from '../redux/actions/types'

import PlacesItem from './PlacesItem'
import ScreenLoader from './ScreenLoader'

const PlacesList = ({ onPressListItem, places }) => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  const loading = isLoading.some((item) => item.loadingType === FETCH_PLACES)

  const showLoading = loading && places?.length < 2

  const keyExtractor = ({ place_id: placeId }) => placeId

  const renderItem = ({ item }) => <PlacesItem onPressListItem={onPressListItem} place={item} />

  return (
    <ScreenLoader loading={showLoading}>
      <FlatList
        data={places}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ backgroundColor: '#F9F9F9' }}
      />
    </ScreenLoader>
  )
}

export default PlacesList
