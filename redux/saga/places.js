/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Location from 'expo-location'

import {
  ASK_LOCATION_PERMISSION,
  CAUGHT_ERROR,
  CHECK_LOCATION,
  FETCH_LOCATION_DETAILS_SUCCESS,
  FETCH_FEED_SUCCESS,
  FETCH_PLACES_SUCCESS,
  NO_LOCATION,
  PERMISSION_LOADING,
  SELECT_PLACE,
  SET_ASKED_LOCATION_PERMISSION,
  SET_CURRENT_LOCATION,
  SET_LOCATION_POSTS,
  SET_PLACES_SEARCH_STRING,
  SET_PLACES,
  SET_SHOW_LOCATION_MODAL,
  UPDATE_LOADING,
} from '../actions/types'
import { fetchPlaceAction, fetchPlacesAction } from '../actions/places'

import { navigate } from '../../navigation/rootNavigation'

import env from '../../environment'

const getAuthUser = (state) => state.auth.user

const getLocation = (state) => state.places.currentLocation

function* fetchCurrentLocation() {
  const location = yield Location.getCurrentPositionAsync({})

  yield put({
    type: SET_CURRENT_LOCATION,
    payload: location,
  })
}

function* fetchPlaces() {
  const currentLocation = yield select(getLocation)

  let params = {
    type: 'bar',
    key: env.google.placeApiKey,
  }

  if (currentLocation) {
    const { latitude, longitude } = currentLocation.coords

    params = {
      ...params,
      radius: 500,
      location: `${latitude},${longitude}`,
    }
  }

  const url = 'textsearch/json'

  yield put(fetchPlacesAction({ params, url }))
}

function* processPermissionStatus(status) {
  switch (status) {
    case 'granted':
      return yield fetchCurrentLocation()
    default:
      yield put({ type: NO_LOCATION })
      return yield fetchPlaces()
  }
}

function* getLocationPermissionStatus() {
  try {
    const { status } = yield Location.getForegroundPermissionsAsync()

    yield processPermissionStatus(status)
  } catch (error) {
    yield put({
      type: CAUGHT_ERROR,
      error,
    })
  }
}

function* onAskLocationPermission() {
  try {
    yield put({
      type: UPDATE_LOADING,
      payload: {
        loadingAction: 'set',
        loadingType: PERMISSION_LOADING,
      },
    })

    const { status } = yield Location.requestForegroundPermissionsAsync()

    yield processPermissionStatus(status)

    yield AsyncStorage.setItem('PERMISSION_LOCATION', 'asked')

    yield put({
      type: SET_SHOW_LOCATION_MODAL,
      payload: false,
    })
  } catch (error) {
    yield put({
      type: CAUGHT_ERROR,
      error,
    })
  } finally {
    yield put({
      type: UPDATE_LOADING,
      payload: {
        loadingAction: 'unset',
        loadingType: PERMISSION_LOADING,
      },
    })
  }
}

function* onCheckLocation(action) {
  const askedPermission = yield AsyncStorage.getItem('PERMISSION_LOCATION')

  if (askedPermission) {
    yield getLocationPermissionStatus(action)
  } else {
    yield put({
      type: SET_SHOW_LOCATION_MODAL,
      payload: true,
    })
  }
}

function* onFetchFeedSuccess(action) {
  const { url } = action.meta.previousAction.payload.request

  const parts = url.split('/')

  const isLocationFeed = parts[1] === 'location'

  if (!isLocationFeed) return

  const { data: posts } = action.payload

  yield put({
    type: SET_LOCATION_POSTS,
    payload: posts,
  })
}

function onFetchLocationDetailsSuccess(action) {
  const { location, reward } = action.payload.data

  if (reward) {
    navigate('Business', {
      screen: 'BusinessDetailScreen',
      params: {
        reward,
      },
    })

    return
  }

  if (location) {
    navigate('Business', {
      screen: 'LocationDetailScreen',
      params: {
        location,
      },
    })
  }
}

function* onFetchPlacesSuccess(action) {
  const { payload } = action

  let posts = []

  if (payload.data.results) {
    posts = [...posts, ...payload.data.results]
  }

  if (payload.data.predictions) {
    posts = [...posts, ...payload.data.predictions]
  }

  yield put({ type: SET_PLACES, payload: posts })
}

function* onSelectPlace(action) {
  const { token } = yield select(getAuthUser)

  const { payload: placeId } = action

  yield put(fetchPlaceAction({ placeId, token }))
}

function* onSetAskedLocationPermission() {
  yield AsyncStorage.setItem('PERMISSION_LOCATION', 'asked')

  yield put({
    type: SET_SHOW_LOCATION_MODAL,
    payload: false,
  })

  yield getLocationPermissionStatus()
}

function* onSetCurrentLocation() {
  yield fetchPlaces()
}

function* onSetPlacesSearchString(action) {
  const currentLocation = yield select(getLocation)

  let params = {
    input: action.payload,
    key: env.google.placeApiKey,
    type: 'establishment',
  }

  if (currentLocation) {
    const { latitude, longitude } = currentLocation.coords

    params = {
      ...params,
      radius: 500,
      location: `${latitude},${longitude}`,
    }
  }

  const url = 'autocomplete/json'

  yield put(fetchPlacesAction({ params, url }))
}

export function* watchPlaces() {
  yield takeEvery(ASK_LOCATION_PERMISSION, onAskLocationPermission)
  yield takeEvery(CHECK_LOCATION, onCheckLocation)
  yield takeEvery(FETCH_FEED_SUCCESS, onFetchFeedSuccess)
  yield takeEvery(FETCH_LOCATION_DETAILS_SUCCESS, onFetchLocationDetailsSuccess)
  yield takeEvery(FETCH_PLACES_SUCCESS, onFetchPlacesSuccess)
  yield takeEvery(SELECT_PLACE, onSelectPlace)
  yield takeEvery(SET_ASKED_LOCATION_PERMISSION, onSetAskedLocationPermission)
  yield takeEvery(SET_CURRENT_LOCATION, onSetCurrentLocation)
  yield takeEvery(SET_PLACES_SEARCH_STRING, onSetPlacesSearchString)
}
