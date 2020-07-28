/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

import {
  ASK_NOTIFICATION_PERMISSION,
  CREATE_POST_SUCCESS,
  FETCH_PLACE_SUCCESS,
  REFRESH_DETAIL,
  SET_POST_LOCATION,
  SET_SHOW_NOTIFICATION_MODAL,
} from '../actions/types'
import { fetchSinglePostAction } from '../actions/post'

import { navigate } from '../../navigation/rootNavigation'
import { updateUserAction } from '../actions/user'

const getAuthUser = (state) => state.auth.user

const getIsCreatingPost = (state) => state.createPost.isCreatingPost

function* getPushToken() {
  const pushToken = yield Notifications.getExpoPushTokenAsync()

  const authUser = yield select(getAuthUser)

  yield put(updateUserAction({ userId: authUser.id, pushToken, token: authUser.token }))
}

function* processNotificationPermissionStatus(status) {
  switch (status) {
    case 'granted':
      yield getPushToken()
      break
    case 'denied':
      break
    default:
      yield put({ type: SET_SHOW_NOTIFICATION_MODAL, payload: true })
  }
}

function* checkNotificationPermissions() {
  const { status } = yield Permissions.getAsync(Permissions.NOTIFICATIONS)

  yield processNotificationPermissionStatus(status)
}

function* onAskNotificationPermission() {
  const { status } = yield Permissions.askAsync(Permissions.NOTIFICATIONS)

  yield processNotificationPermissionStatus(status)
}

function* onCreatePostSuccess() {
  yield checkNotificationPermissions()

  navigate('Main', {
    screen: 'Root',
    params: {
      screen: 'FeedStack',
      params: {
        screen: 'Feed',
        params: {
          action: 'scrollUp',
        },
      },
    },
  })
}

function* onFetchPlaceSuccess(action) {
  const isCreatingPost = yield select(getIsCreatingPost)

  if (!isCreatingPost) return

  const { data: location } = action.payload

  yield put({
    type: SET_POST_LOCATION,
    payload: location,
  })

  navigate('CreateAddCaption')
}

function* onRefreshDetail(action) {
  const { payload: postId } = action

  const authUser = yield select(getAuthUser)

  yield put(fetchSinglePostAction({ postId, token: authUser.token, userId: authUser.id }))
}

export function* watchPost() {
  yield takeEvery(ASK_NOTIFICATION_PERMISSION, onAskNotificationPermission)
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(FETCH_PLACE_SUCCESS, onFetchPlaceSuccess)
  yield takeEvery(REFRESH_DETAIL, onRefreshDetail)
}
