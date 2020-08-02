/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import { AsyncStorage } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import {
  ASK_LOCATION_PERMISSION,
  CAUGHT_ERROR,
  CHECK_LOCATION,
  FETCH_PLACES_SUCCESS,
  SELECT_PLACE,
  SET_ASKED_LOCATION_PERMISSION,
  SET_CURRENT_LOCATION,
  SET_INCLUDE_NO_IDEA,
  SET_PLACES_SEARCH_STRING,
  SET_PLACES,
  SET_SHOW_LOCATION_MODAL,
} from '../actions/types'
import { fetchPlaceAction, fetchPlacesAction } from '../actions/places'

import env from '../../environment'

const NO_IDEA = {
  type: 'NO_GUESS',
}

const getAuthUser = (state) => state.auth.user

const getLocation = (state) => state.places.currentLocation

const getIncludeNoIdea = (state) => state.places.includeNoIdea

function* fetchCurrentLocation() {
  const location = yield Location.getCurrentPositionAsync({})

  yield put({
    type: SET_CURRENT_LOCATION,
    payload: location,
  })
}

function* fetchPlaces() {
  const currentLocation = yield select(getLocation)

  const includeNoIdea = yield select(getIncludeNoIdea)

  let params = {
    type: 'bar',
    key: env.google.placeApiKey,
  }

  if (currentLocation) {
    const { latitude, longitude } = this.currentLocation.coords

    params = {
      ...params,
      radius: 500,
      location: `${latitude},${longitude}`,
    }
  }

  const url = 'textsearch/json'

  yield put(fetchPlacesAction({ includeNoIdea, params, url }))
}

function* processPermissionStatus(status) {
  switch (status) {
    case 'granted':
      return yield fetchCurrentLocation()
    default:
      return yield fetchPlaces()
  }
}

function* getLocationPermissionStatus() {
  try {
    const { status } = yield Permissions.getAsync(Permissions.LOCATION)

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
    const { status } = yield Permissions.askAsync(Permissions.LOCATION)

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
  }
}

function* onCheckLocation(action) {
  const askedPermission = yield AsyncStorage.getItem('PERMISSION_LOCATION')

  const { includeNoIdea = false } = action.payload

  yield put({ type: SET_INCLUDE_NO_IDEA, payload: includeNoIdea })

  if (askedPermission) {
    yield getLocationPermissionStatus(action)
  } else {
    yield put({
      type: SET_SHOW_LOCATION_MODAL,
      payload: true,
    })
  }
}

function* onFetchPlacesSuccess(action) {
  const { meta, payload } = action

  const { includeNoIdea } = meta.previousAction.payload

  let posts = includeNoIdea ? [NO_IDEA] : []

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
  yield AsyncStorage.setItem('PERMISSION_LOCATION', true)

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
    const { latitude, longitude } = this.currentLocation.coords

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
  yield takeEvery(FETCH_PLACES_SUCCESS, onFetchPlacesSuccess)
  yield takeEvery(SELECT_PLACE, onSelectPlace)
  yield takeEvery(SET_ASKED_LOCATION_PERMISSION, onSetAskedLocationPermission)
  yield takeEvery(SET_CURRENT_LOCATION, onSetCurrentLocation)
  yield takeEvery(SET_PLACES_SEARCH_STRING, onSetPlacesSearchString)
}
