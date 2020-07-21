import { put, takeEvery, select } from 'redux-saga/effects'

import { REFRESH_LEADERBOARD, SET_AUTH_USER } from '../actions/types';
import { fetchLeaderboardAction } from '../actions/leaderboard';

const getAuthUser = state => state.auth.user

function* fetchLeaderboard() {
  const { token } = yield select(getAuthUser);

  yield put(fetchLeaderboardAction({ token }));
}

function* onRefreshLeaderboard() {
  yield fetchLeaderboard()
}

function* onSetAuthUser() {
  yield fetchLeaderboard()
}

export function* watchLeaderboard() {
  yield takeEvery(REFRESH_LEADERBOARD, onRefreshLeaderboard)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
};
