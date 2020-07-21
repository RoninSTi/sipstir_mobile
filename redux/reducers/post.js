import {
  CLEAR_CHEERS,
  FETCH_POST_CHEERS_SUCCESS,
  FETCH_SINGLE_POST_SUCCESS,
  LOGOUT,
  REFRESH_DETAIL
} from '../actions/types'

const initialState = {
  isRefreshing: false,
  cheers: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action
  
  switch (type) {
    case CLEAR_CHEERS: {
      return {
        ...state,
        cheers: []
      }
    }
    case FETCH_POST_CHEERS_SUCCESS: {
      return {
        ...state,
        cheers: payload.data
      }
    }
    case FETCH_SINGLE_POST_SUCCESS: {
      return {
        ...state,
        isRefreshing: false
      }
    }
    case LOGOUT: 
      return {
        ...initialState
      }
    case REFRESH_DETAIL: {
      return {
        ...state,
        isRefreshing: true
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default reducer