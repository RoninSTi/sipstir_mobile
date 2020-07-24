/* eslint-disable import/prefer-default-export */
import { put, select, takeEvery } from 'redux-saga/effects'

import { LOGOUT, SET_LOADING, UPDATE_LOADING } from '../actions/types'

const getLoaders = (state) => state.ui.isLoading

function* addLoading({ loadingType, meta }) {
  const loaders = yield select(getLoaders)

  yield put({
    type: SET_LOADING,
    payload: [...loaders, { loadingType, meta }],
  })
}

function* removeLoading({ loadingType, meta }) {
  const loaders = yield select(getLoaders)

  const newLoaders = loaders.filter(
    (loader) => loader.loadingType !== loadingType && loader.meta !== meta
  )

  yield put({
    type: SET_LOADING,
    payload: newLoaders,
  })
}

function* onUpdateLoading(action) {
  const {
    payload: { loadingAction, loadingType, meta },
  } = action

  switch (loadingAction) {
    case 'set':
      yield addLoading({ loadingType, meta })
      break
    case 'unset':
      yield removeLoading({ loadingType, meta })
      break
    default:
      break
  }
}

function* checkLoading(action) {
  const setLoading = action.payload?.setLoading

  if (setLoading) {
    yield onUpdateLoading({
      payload: {
        loadingAction: 'set',
        loadingType: action.type,
        meta: setLoading.meta,
      },
    })
  }

  if (action.meta?.previousAction) {
    yield onUpdateLoading({
      payload: {
        loadingAction: 'unset',
        loadingType: action.meta?.previousAction?.type,
        meta: action.meta?.previousAction.payload.setLoading?.meta,
      },
    })
  }
}

function* onUnAuthorized() {
  yield put({ type: LOGOUT })
}

export function* watchUI() {
  yield takeEvery((action) => action.error?.response?.data?.statusCode === 401, onUnAuthorized)
  yield takeEvery((action) => action.payload?.setLoading, checkLoading)
  yield takeEvery((action) => action.meta?.previousAction, checkLoading)
  yield takeEvery(UPDATE_LOADING, onUpdateLoading)
}
