import { put, takeEvery, select } from 'redux-saga/effects'

import {
  CHECK_LOCATION,
  NO_LOCATION,
  REDEEM_REWARD_SUCCESS,
  SET_AUTH_USER,
  SET_CURRENT_LOCATION,
} from '../actions/types'
import { fetchRedemptionsAction, fetchRewardsAction } from '../actions/rewards'

import { navigate } from '../../navigation/rootNavigation'

const getAuthUser = (state) => state.auth.user

const getCurrentLocation = (state) => state.places.currentLocation

function* onSetAuthUser() {
  const authUser = yield select(getAuthUser)

  const id = authUser?.id

  if (!id) return

  yield put({ type: CHECK_LOCATION, payload: {} })

  yield put(fetchRedemptionsAction({ token: authUser.token, userId: id }))
}

function* fetchRewards({ includeLocation = false, search = null }) {
  const { token } = yield select(getAuthUser)

  if (!token) return

  let params = {
    search,
  }

  if (includeLocation) {
    const currentLocation = yield select(getCurrentLocation)

    const { latitude: lat, longitude: lng } = currentLocation.coords

    params = {
      ...params,
      lat,
      lng,
    }
  }

  yield put(fetchRewardsAction({ token, ...params }))
}

function onRedeemRewardSuccess() {
  navigate('RewardSuccess')
}

function* onSetCurrentLocation() {
  yield fetchRewards({ includeLocation: true })
}

function* onNoLocation() {
  yield fetchRewards()
}

function* watchRewards() {
  yield takeEvery(NO_LOCATION, onNoLocation)
  yield takeEvery(REDEEM_REWARD_SUCCESS, onRedeemRewardSuccess)
  yield takeEvery(SET_AUTH_USER, onSetAuthUser)
  yield takeEvery(SET_CURRENT_LOCATION, onSetCurrentLocation)
}

export default watchRewards
