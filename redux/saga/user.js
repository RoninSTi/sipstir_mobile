/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import { CREATE_GUESS_SUCCESS, CREATE_POST_SUCCESS } from '../actions/types'
import { fetchMyUserAction } from '../actions/user'

const getAuthUser = (state) => state.auth.user

function* fetchMyUser() {
  const { id: userId, token } = yield select(getAuthUser)

  if (!userId) return

  yield put(fetchMyUserAction({ token, userId }))
}

function* onCreateGuessSuccess() {
  yield fetchMyUser()
}

function* onCreatePostSuccess() {
  yield fetchMyUser()
}

export function* watchUser() {
  yield takeEvery(CREATE_GUESS_SUCCESS, onCreateGuessSuccess)
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
}
