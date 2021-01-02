/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import { SET_AUTH_USER } from '../actions/types'
import { fetchBlockedAction } from '../actions/blocked'

const getAuthUser = (state) => state.auth.user

function* fetchBlocked() {
  const authUser = yield select(getAuthUser)

  const token = authUser?.token

  yield put(fetchBlockedAction({ token }))
}

function* onSetAuthUser() {
  const authUser = yield select(getAuthUser)

  const id = authUser?.id

  if (!id) return

  yield fetchBlocked()
}

export function* watchBlocked() {
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
}
