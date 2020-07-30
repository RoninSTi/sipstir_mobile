/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery, select } from 'redux-saga/effects'

import { AsyncStorage } from 'react-native'

import * as WebBrowser from 'expo-web-browser'
import jwtDecode from 'jwt-decode'
import * as Facebook from 'expo-facebook'

import {
  ATTEMPT_LOGIN,
  ATTEMPT_LOGOUT,
  CREATE_USER_SUCCESS,
  GET_USER_BY_EMAIL_SUCCESS,
  LOGOUT,
  SET_AUTH_USER,
  UPDATE_LOADING,
  SET_LOGGED_IN,
  FACEBOOK_AUTH_SUCCESS,
} from '../actions/types'
import { facebookAuthAction, getUserByEmailAction } from '../actions/auth'
import { createUserAction } from '../actions/user'

import { toQueryString } from '../../helpers/url'

import env from '../../environment'
import { navigate } from '../../navigation/rootNavigation'

const getUser = (state) => state.auth.user

function* onFacebookAuthSuccess(action) {
  const { accessToken } = action.payload.data

  const decodedJwtIdToken = jwtDecode(accessToken)

  const { email, picture } = decodedJwtIdToken

  yield put({
    type: SET_AUTH_USER,
    payload: {
      avatar: picture.data.url,
      email,
      token: accessToken,
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

  yield Facebook.initializeAsync('2451578761628671')

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

  const { email, id, token, username } = user

  if (!id) {
    yield put(getUserByEmailAction({ email, token }))

    return
  }

  if (!username) {
    navigate('CreateProfile')

    return
  }

  yield AsyncStorage.setItem('user', JSON.stringify(user))

  yield put({ type: SET_LOGGED_IN, payload: true })
}

function* onCreateUserSuccess(action) {
  const { id } = action.payload.data

  yield put({
    type: SET_AUTH_USER,
    payload: { id },
  })
}

function* onGetUserByEmail(action) {
  const { data: user } = action.payload

  const { avatar, email } = yield select(getUser)

  if (user) {
    const { id, username } = user
    yield put({
      type: SET_AUTH_USER,
      payload: {
        avatar,
        email,
        id,
        username,
      },
    })
  } else {
    const { avatar: a, email: e, token } = yield select(getUser)

    yield put(createUserAction({ avatar: a, email: e, token }))
  }
}

export function* watchAuth() {
  yield takeEvery(ATTEMPT_LOGIN, onAttemptLogin)
  yield takeEvery(ATTEMPT_LOGOUT, onAttemptLogout)
  yield takeEvery(CREATE_USER_SUCCESS, onCreateUserSuccess)
  yield takeEvery(FACEBOOK_AUTH_SUCCESS, onFacebookAuthSuccess)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
  yield takeEvery(GET_USER_BY_EMAIL_SUCCESS, onGetUserByEmail)
}
