/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CHECK_USERNAME_SUCCESS,
  CREATE_PROFILE_SUCCESS,
  SET_USERNAME,
  SET_SHOW_AVAILABLE_INDICATOR,
  SET_AUTH_USER,
} from '../actions/types'
import { checkUsernameAction } from '../actions/createProfile'

const getUsername = (state) => state.createProfile.username

const getToken = (state) => state.auth.user.token

function* onCheckUsernameSuccess() {
  const username = yield select(getUsername)

  yield put({
    type: SET_SHOW_AVAILABLE_INDICATOR,
    payload: !!username?.length > 0,
  })
}

function* onCreateProfileSuccess(action) {
  const { username, avatar } = action.payload.data

  yield put({
    type: SET_AUTH_USER,
    payload: {
      avatar,
      username,
    },
  })
}

function* onSetUsername(action) {
  const { payload: username } = action

  const token = yield select(getToken)

  yield put(checkUsernameAction({ username, token }))
}

export function* watchCreateProfile() {
  yield takeEvery(SET_USERNAME, onSetUsername)
  yield takeEvery(CHECK_USERNAME_SUCCESS, onCheckUsernameSuccess)
  yield takeEvery(CREATE_PROFILE_SUCCESS, onCreateProfileSuccess)
}
