import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CHEERS_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  FETCH_SINGLE_POST_SUCCESS,
  REFRESH_FEED, SET_AUTH_USER,
  SET_POSTS,
  CREATE_POST_SUCCESS,
} from '../actions/types';
import { fetchFeedAction } from '../actions/feed';

const getAuthUser = state => state.auth.user

const getPosts = state => state.feed.posts

const getFeedParams = state => {
  const { feedType, page, pageSize } = state.feed;

  return { feedType, page, pageSize }
}

function* fetchFeed() {
  const { id: userId, token } = yield select(getAuthUser);

  if (!userId) return

  const feedParams = yield select(getFeedParams);

  yield put(fetchFeedAction({ ...feedParams, token, userId }));
}

function* onCheersPostSuccess(action) {
  const post = action.payload.data

  yield replacePost(post)
}

function* onCreateCommentSuccess(action) {
  const post = action.payload.data

  yield replacePost(post)
}

function* onCreatePostSuccess(action) {
  const post = action.payload.data

  yield replacePost(post)
}

function* onFetchSinglePostSuccess(action) {
  const post = action.payload.data
  
  yield replacePost(post)
}

function* onRefreshFeed() {
  yield fetchFeed()
}

function* onSetAuthUser() {
  yield fetchFeed()
}

function* replacePost(post) {
  const posts = yield select(getPosts)

  let index = -1

  posts.forEach((p, i) => {
    if (p.id === post.id) {
      index = i;
    }
  })

  if (index === -1) {
    yield put({ 
      type: SET_POSTS,
      payload: [post, ...posts]
    })
  } else {
    posts[index] = post;

    yield put({
      type: SET_POSTS,
      payload: posts
    })
  }
}

export function* watchFeed() {
  yield takeEvery(CHEERS_POST_SUCCESS, onCheersPostSuccess)
  yield takeEvery(CREATE_COMMENT_SUCCESS, onCreateCommentSuccess)
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(FETCH_SINGLE_POST_SUCCESS, onFetchSinglePostSuccess)
  yield takeEvery(REFRESH_FEED, onRefreshFeed)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
};
