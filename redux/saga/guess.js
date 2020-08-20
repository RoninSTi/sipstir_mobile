/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import {
  ATTEMPT_GUESS,
  CREATE_GUESS_SUCCESS,
  FETCH_PLACE_SUCCESS,
  SET_GUESS_LOCATION,
} from '../actions/types'

import { navigate } from '../../navigation/rootNavigation'

const getIsGuessing = (state) => state.createGuess.isGuessing

function onAttemptGuess(action) {
  const { payload: params } = action

  navigate('Guess', {
    screen: 'GuessSelectLocation',
    params,
  })
}

function onCreateGuessSuccess(action) {
  const { data: response } = action.payload

  const { post, reward } = response

  navigate('Main', {
    screen: 'Root',
    params: {
      screen: 'FeedStack',
      params: {
        screen: 'Detail',
        params: {
          postId: post.id,
          showPointsModal: true,
          reward,
        },
      },
    },
  })
}

function* onFetchPlaceSuccess(action) {
  const isGuessing = yield select(getIsGuessing)

  if (!isGuessing) return

  const { data: location } = action.payload

  yield put({
    type: SET_GUESS_LOCATION,
    payload: location,
  })

  navigate('GuessAddComment')
}

export function* watchGuess() {
  yield takeEvery(ATTEMPT_GUESS, onAttemptGuess)
  yield takeEvery(CREATE_GUESS_SUCCESS, onCreateGuessSuccess)
  yield takeEvery(FETCH_PLACE_SUCCESS, onFetchPlaceSuccess)
}
