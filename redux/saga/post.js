/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CREATE_POST_SUCCESS,
  FETCH_PLACE_SUCCESS,
  REFRESH_DETAIL,
  SET_POST_LOCATION,
} from '../actions/types'
import { fetchSinglePostAction } from '../actions/post'

import { navigate } from '../../navigation/rootNavigation'

const getAuthUser = (state) => state.auth.user

const getIsCreatingPost = (state) => state.createPost.isCreatingPost

function onCreatePostSuccess() {
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
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(FETCH_PLACE_SUCCESS, onFetchPlaceSuccess)
  yield takeEvery(REFRESH_DETAIL, onRefreshDetail)
}
