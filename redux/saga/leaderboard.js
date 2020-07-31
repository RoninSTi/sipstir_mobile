/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CREATE_GUESS_SUCCESS,
  CREATE_POST_SUCCESS,
  REFRESH_LEADERBOARD,
  SET_AUTH_USER,
} from '../actions/types'
import { fetchLeaderboardAction } from '../actions/leaderboard'

const getAuthUser = (state) => state.auth.user

function* fetchLeaderboard() {
  const authUser = yield select(getAuthUser)

  const token = authUser?.token

  yield put(fetchLeaderboardAction({ token }))
}

function* onCreateGuessSuccess() {
  yield fetchLeaderboard()
}

function* onCreatePostSuccess() {
  yield fetchLeaderboard()
}

function* onRefreshLeaderboard() {
  yield fetchLeaderboard()
}

function* onSetAuthUser() {
  const authUser = yield select(getAuthUser)

  const id = authUser?.id

  if (!id) return

  yield fetchLeaderboard()
}

export function* watchLeaderboard() {
  yield takeEvery(CREATE_GUESS_SUCCESS, onCreateGuessSuccess)
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(REFRESH_LEADERBOARD, onRefreshLeaderboard)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
}
