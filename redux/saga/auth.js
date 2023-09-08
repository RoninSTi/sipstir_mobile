/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import AsyncStorage from '@react-native-async-storage/async-storage'

import * as AppleAuthentication from 'expo-apple-authentication'

import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

import jwtDecode from 'jwt-decode'

import {
  ATTEMPT_APPLE_LOGIN,
  ATTEMPT_LOGIN,
  ATTEMPT_LOGOUT,
  AUTH_APPLE_SUCCESS,
  AUTH_EMAIL_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  FACEBOOK_AUTH_SUCCESS,
  LOGOUT,
  SET_AUTH_USER,
  SET_LOGGED_IN,
  UPDATE_LOADING,
} from '../actions/types'
import { appleAuthAction, facebookAuthAction } from '../actions/auth'

import { navigate } from '../../navigation/rootNavigation'

const getUser = (state) => state.auth.user

function* setAuthUser({ accessToken }) {
  const user = jwtDecode(accessToken)

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

function* onAuthAppleSuccess(action) {
  const { accessToken, user } = action.payload.data

  yield setAuthUser({ accessToken, user })
}

function* onAuthEmailSuccess(action) {
  const { accessToken } = action.payload.data

  yield setAuthUser({ accessToken })
}

function* onAuthRegisterSuccess(action) {
  const { accessToken } = action.payload.data

  yield setAuthUser({ accessToken })
}

function* onFacebookAuthSuccess(action) {
  const { accessToken } = action.payload.data

  yield setAuthUser({ accessToken })
}

function* onAttemptAppleLogin() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingType: ATTEMPT_APPLE_LOGIN,
      loadingAction: 'set',
    },
  })

  const credential = yield AppleAuthentication.signInAsync({
    requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
  })

  const { identityToken } = credential

  yield put(appleAuthAction({ identityToken }))
}

function* onAttemptLogin() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingType: ATTEMPT_LOGIN,
      loadingAction: 'set',
    },
  })

  yield LoginManager.logInWithPermissions(['public_profile', 'email'])

  const authTokenResult = yield AccessToken.getCurrentAccessToken()

  yield put(facebookAuthAction({ fbToken: authTokenResult.accessToken.toString() }))
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
  yield takeEvery(ATTEMPT_APPLE_LOGIN, onAttemptAppleLogin)
  yield takeEvery(ATTEMPT_LOGIN, onAttemptLogin)
  yield takeEvery(ATTEMPT_LOGOUT, onAttemptLogout)
  yield takeEvery(AUTH_APPLE_SUCCESS, onAuthAppleSuccess)
  yield takeEvery(AUTH_EMAIL_SUCCESS, onAuthEmailSuccess)
  yield takeEvery(AUTH_REGISTER_SUCCESS, onAuthRegisterSuccess)
  yield takeEvery(FACEBOOK_AUTH_SUCCESS, onFacebookAuthSuccess)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
}
