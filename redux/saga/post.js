/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

import {
  ASK_NOTIFICATION_PERMISSION,
  CREATE_POST_SUCCESS,
  FETCH_PLACE_SUCCESS,
  REFRESH_DETAIL,
  REPORT_POST_SUCCESS,
  SET_DROPDOWN_DATA,
  SET_POST_LOCATION,
  SET_SHOW_NOTIFICATION_MODAL,
  SET_SHOULD_SCROLL_UP,
} from '../actions/types'
import { fetchSinglePostAction } from '../actions/post'

import { navigate } from '../../navigation/rootNavigation'
import { updateUserAction } from '../actions/user'

const getAuthUser = (state) => state.auth.user

const getIsCreatingPost = (state) => state.createPost.isCreatingPost

function* getPushToken() {
  const pushToken = yield Notifications.getExpoPushTokenAsync()
  const authUser = yield select(getAuthUser)
  yield put(
    updateUserAction({ userId: authUser.id, pushToken: pushToken.data, token: authUser.token })
  )
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
  const { status } = yield Notifications.getPermissionsAsync()
  yield processNotificationPermissionStatus(status)
}

function* onAskNotificationPermission() {
  const { status } = yield Notifications.requestPermissionsAsync()
  yield processNotificationPermissionStatus(status)
  yield put({ type: SET_SHOW_NOTIFICATION_MODAL, payload: false })
}

function* onCreatePostSuccess() {
  if (Device.isDevice) yield checkNotificationPermissions()

  navigate('Main', {
    screen: 'Root',
    params: {
      screen: 'FeedStack',
      params: {
        screen: 'Feed',
      },
    },
  })

  yield put({
    type: SET_SHOULD_SCROLL_UP,
    payload: true,
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

function* onReportPostSuccess() {
  const message = 'An admin  will review the post and remove if a violation has been found.'

  const title = 'Post reported successfully'

  yield put({
    type: SET_DROPDOWN_DATA,
    payload: {
      alertType: 'success',
      message,
      title,
    },
  })
}

export function* watchPost() {
  yield takeEvery(ASK_NOTIFICATION_PERMISSION, onAskNotificationPermission)
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(FETCH_PLACE_SUCCESS, onFetchPlaceSuccess)
  yield takeEvery(REFRESH_DETAIL, onRefreshDetail)
  yield takeEvery(REPORT_POST_SUCCESS, onReportPostSuccess)
}
