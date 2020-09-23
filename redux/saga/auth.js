/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import { AsyncStorage } from 'react-native'

import * as Facebook from 'expo-facebook'

import {
  ATTEMPT_LOGIN,
  ATTEMPT_LOGOUT,
  LOGOUT,
  SET_AUTH_USER,
  UPDATE_LOADING,
  SET_LOGGED_IN,
  FACEBOOK_AUTH_SUCCESS,
} from '../actions/types'
import { facebookAuthAction } from '../actions/auth'

import { navigate } from '../../navigation/rootNavigation'

const getUser = (state) => state.auth.user

function* onFacebookAuthSuccess(action) {
  const { accessToken, user } = action.payload.data

  const { avatar, email, username, id } = user

  yield put({
    type: SET_AUTH_USER,
    payload: {
      avatar,
      email,
      id,
      token: accessToken,
      username,
    },
  })
}

function* onAttemptLogin() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingType: ATTEMPT_LOGIN,
      loadingAction: 'set',
    },
  })

  yield Facebook.initializeAsync('358673965266057')

  const { token } = yield Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile, email'],
  })

  yield put(facebookAuthAction({ fbToken: token }))
}

function* onAttemptLogout() {
  yield put({ type: LOGOUT })

  yield AsyncStorage.removeItem('user')
}

function* onSetAuthUser() {
  const user = yield select(getUser)

  const { username } = user

  if (!username) {
    navigate('CreateProfile')

    return
  }

  yield AsyncStorage.setItem('user', JSON.stringify(user))

  yield put({ type: SET_LOGGED_IN, payload: true })
}

export function* watchAuth() {
  yield takeEvery(ATTEMPT_LOGIN, onAttemptLogin)
  yield takeEvery(ATTEMPT_LOGOUT, onAttemptLogout)
  yield takeEvery(FACEBOOK_AUTH_SUCCESS, onFacebookAuthSuccess)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
}
