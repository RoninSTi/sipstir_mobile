/* eslint-disable import/prefer-default-export */
import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CHECK_LOCATION,
  CHEERS_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_GUESS_SUCCESS,
  FETCH_FEED_SUCCESS,
  FETCH_SINGLE_POST_SUCCESS,
  REFRESH_FEED,
  SET_AUTH_USER,
  SET_POSTS,
  CREATE_POST_SUCCESS,
  SET_CURRENT_LOCATION,
  SET_FEED_TYPE,
} from '../actions/types'
import { fetchFeedAction } from '../actions/feed'

const getAuthUser = (state) => state.auth.user

const getCurrentLocation = (state) => state.places.currentLocation

const getPosts = (state) => state.feed.posts[state.feed.feedType]

const getFeedParams = (state) => {
  const { feedType, page, pageSize } = state.feed

  return { feedType, page, pageSize }
}

function* fetchFeed() {
  const { id: userId, token } = yield select(getAuthUser)

  if (!userId) return

  let feedParams = yield select(getFeedParams)

  const { feedType } = feedParams

  if (feedType === 'nearby') {
    const currentLocation = yield select(getCurrentLocation)

    const { latitude: lat, longitude: lng } = currentLocation.coords

    feedParams = {
      ...feedParams,
      lat,
      lng,
      radius: 40000,
    }
  }

  yield put(fetchFeedAction({ ...feedParams, token, userId }))
}

function* replacePost(post) {
  const posts = yield select(getPosts)

  let index = -1

  posts.forEach((p, i) => {
    if (p.id === post.id) {
      index = i
    }
  })

  if (index === -1) {
    yield put({
      type: SET_POSTS,
      payload: [post, ...posts],
    })
  } else {
    posts[index] = post

    yield put({
      type: SET_POSTS,
      payload: posts,
    })
  }
}

function* onCheersPostSuccess(action) {
  const { data: post } = action.payload

  yield replacePost(post)
}

function* onCreateCommentSuccess(action) {
  const { data: post } = action.payload

  yield replacePost(post)
}

function* onCreateGuessSuccess(action) {
  const { post } = action.payload.data

  yield replacePost(post)
}

function* onCreatePostSuccess(action) {
  const { data: post } = action.payload

  yield replacePost(post)
}

function* onFetchFeedSuccess(action) {
  const { id } = yield select(getAuthUser)
  const { url } = action.meta.previousAction.payload.request

  const parts = url.split('/')

  const isUserFeed = parts[1] === 'user' && parts[3] === `${id}`

  if (isUserFeed) return

  const { data: posts } = action.payload

  yield put({
    type: SET_POSTS,
    payload: posts,
  })
}

function* onFetchSinglePostSuccess(action) {
  const { data: post } = action.payload

  yield replacePost(post)
}

function* onRefreshFeed() {
  const { feedType } = yield select(getFeedParams)

  if (feedType === 'nearby') {
    yield put({ type: CHECK_LOCATION, payload: {} })
  } else {
    yield fetchFeed()
  }
}

function* onSetAuthUser() {
  const authUser = yield select(getAuthUser)

  const id = authUser?.id

  if (!id) return

  yield fetchFeed()
}

function* onSetCurrentLocation() {
  yield fetchFeed()
}

function* onSetFeedType(action) {
  const { payload: feedType } = action

  if (feedType === 'nearby') {
    yield put({ type: CHECK_LOCATION, payload: {} })
  } else {
    yield fetchFeed()
  }
}

export function* watchFeed() {
  yield takeEvery(CHEERS_POST_SUCCESS, onCheersPostSuccess)
  yield takeEvery(CREATE_COMMENT_SUCCESS, onCreateCommentSuccess)
  yield takeEvery(CREATE_GUESS_SUCCESS, onCreateGuessSuccess)
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(FETCH_FEED_SUCCESS, onFetchFeedSuccess)
  yield takeEvery(FETCH_SINGLE_POST_SUCCESS, onFetchSinglePostSuccess)
  yield takeEvery(REFRESH_FEED, onRefreshFeed)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
  yield takeEvery(SET_CURRENT_LOCATION, onSetCurrentLocation)
  yield takeEvery(SET_FEED_TYPE, onSetFeedType)
}
