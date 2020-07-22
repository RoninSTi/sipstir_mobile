/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CHECK_LOCATION,
  FETCH_PLACES_SUCCESS,
  SELECT_PLACE,
  SET_PLACES_SEARCH_STRING,
  SET_PLACES,
} from '../actions/types'
import { fetchPlaceAction, fetchPlacesAction } from '../actions/places'

import env from '../../environment'

const NO_IDEA = {
  type: 'NO_GUESS',
}

const getAuthUser = (state) => state.auth.user

const getLocation = (state) => state.places.currentLocation

function* onCheckLocation(action) {
  const currentLocation = yield select(getLocation)

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

  const { includeNoIdea } = action.payload

  const url = 'textsearch/json'

  yield put(fetchPlacesAction({ includeNoIdea, params, url }))
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
  yield takeEvery(CHECK_LOCATION, onCheckLocation)
  yield takeEvery(FETCH_PLACES_SUCCESS, onFetchPlacesSuccess)
  yield takeEvery(SELECT_PLACE, onSelectPlace)
  yield takeEvery(SET_PLACES_SEARCH_STRING, onSetPlacesSearchString)
}
