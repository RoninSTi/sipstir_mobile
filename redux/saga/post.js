import { put, takeEvery, select } from 'redux-saga/effects'

import { CREATE_POST_SUCCESS, FETCH_PLACE_SUCCESS, REFRESH_DETAIL, SET_IS_CREATING_POST } from '../actions/types';
import { fetchSinglePostAction } from '../actions/post';

import { navigate } from '../../navigation/rootNavigation';

const getAuthUser = state => state.auth.user

const getIsCreatingPost = state => state.createPost.isCreatingPost

function* onCreatePostSuccess() {
  navigate('Root')
}

function* onFetchPlaceSuccess() {
  const isCreatingPost = yield select(getIsCreatingPost)

  if (!isCreatingPost) return

  navigate('CreateAddCaption')
}

function* onRefreshDetail(action) {
  const { payload: postId } = action

  const authUser = yield select(getAuthUser);

  yield put(fetchSinglePostAction({ postId, token: authUser.token, userId: authUser.id }))
}

export function* watchPost() {
  yield takeEvery(CREATE_POST_SUCCESS, onCreatePostSuccess)
  yield takeEvery(FETCH_PLACE_SUCCESS, onFetchPlaceSuccess)
  yield takeEvery(REFRESH_DETAIL, onRefreshDetail)
};
