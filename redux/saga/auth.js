import { call, put, takeEvery, select } from 'redux-saga/effects'

import { AsyncStorage } from 'react-native'

import {
  ATTEMPT_LOGIN,
  ATTEMPT_LOGOUT,
  CREATE_USER_SUCCESS,
  GET_USER_BY_EMAIL_SUCCESS,
  LOGOUT,
  SET_AUTH_USER,
  UPDATE_LOADING
} from '../actions/types'
import { getUserByEmailAction } from '../actions/auth'
import { createUserAction } from '../actions/user'

import { toQueryString } from '../../helpers/url';

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from 'jwt-decode';

import env from '../../environment';
import { navigate } from '../../navigation/rootNavigation';

const getUser = state => state.auth.user;

function* onAttemptLogin() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingType: ATTEMPT_LOGIN,
      loadingAction: 'set'
    }
  })

  const redirectUrl = AuthSession.getRedirectUrl();

  const params = {
    audience: env.auth0.audience,
    client_id: env.auth0.clientId,
    prompt: 'login',
    redirect_uri: redirectUrl,
    response_type: 'token id_token',
    scope: 'openid profile email offline_access',
    nonce: 'nonce',
    rememberLastLogin: true,
  };

  const queryParams = toQueryString(params);

  const authUrl = `https://${env.auth0.domain}/authorize${queryParams}`;

  const response = yield call(() => AuthSession.startAsync({
    authUrl,
    showInRecents: true,
  }))

  yield handleLoginResponse(response);
}

function* onAttemptLogout() {
  const params = toQueryString({
    client_id: env.auth0.clientId,
    returnTo: `https://www.barsnap.com/`,
  });

  yield call(() => WebBrowser.openBrowserAsync(`https://${env.auth0.domain}/v2/logout${params}`));

  yield put({ type: LOGOUT })

  yield AsyncStorage.removeItem('user')

  navigate('Auth');
}

function* onSetAuthUser() {
  const user = yield select(getUser);

  const { email, id, token, username } = user;

  if (!id) {
    yield put(getUserByEmailAction({ email, token }))

    return;
  }

  if (!username) {
    navigate('CreateProfile');

    return;
  }

  yield AsyncStorage.setItem('user', JSON.stringify(user))

  navigate('Root')
}

function * handleLoginResponse(response) {
  if (response.error || response.type !== 'success') {
    yield put({
      type: UPDATE_LOADING,
      payload: {
        loadingType: ATTEMPT_LOGIN,
        loadingAction: 'unset'
      }
    })

    return;
  }

  const { access_token: token } = response.params;

  const decodedJwtIdToken = jwtDecode(response.params.id_token);

  const { email, picture } = decodedJwtIdToken;

  yield put({
    type: SET_AUTH_USER,
    payload: {
      avatar: picture,
      email,
      token
    }
  });
};

function* onCreateUserSuccess(action) {
  const { id } = action.payload.data

  yield put({
    type: SET_AUTH_USER,
    payload: { id }
  })
}

function* onGetUserByEmail(action) {
  const { data: user } = action.payload

  const {avatar, email } = yield select(getUser)

  if (user) {
    const { id, username } = user;
    yield put({
      type: SET_AUTH_USER,
      payload: {
        avatar,
        email,
        id, 
        username,
      }
    });
  } else {
    const { avatar, email, token } = yield select(getUser)

    yield put(createUserAction({ avatar, email, token }))
  }
}

export function* watchAuth() {
  yield takeEvery(ATTEMPT_LOGIN, onAttemptLogin)
  yield takeEvery(ATTEMPT_LOGOUT, onAttemptLogout)
  yield takeEvery(CREATE_USER_SUCCESS, onCreateUserSuccess)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
  yield takeEvery(GET_USER_BY_EMAIL_SUCCESS, onGetUserByEmail)
};
