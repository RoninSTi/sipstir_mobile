import {
  CREATE_PROFILE_SUCCESS,
  CREATE_USER_SUCCESS,
  FETCH_MY_USER_SUCCESS,
  FOLLOW_USER_SUCCESS,
  GET_USER_BY_EMAIL_SUCCESS,
  LOGOUT,
  REFRESH_USER,
  UPDATE_USER_SUCCESS,
} from '../actions/types'

const initialState = {
  avatar: null,
  username: null,
  points: 0,
  pointsBalance: 0,
  createdAt: null,
  updatedAt: null,
  allTimeLeaderboardPosition: 0,
  followers: [],
  following: [],
  isRefreshing: false,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CREATE_PROFILE_SUCCESS:
    case CREATE_USER_SUCCESS:
    case FETCH_MY_USER_SUCCESS:
    case FOLLOW_USER_SUCCESS:
    case GET_USER_BY_EMAIL_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...payload.data,
        isRefreshing: false,
      }
    case LOGOUT:
      return {
        ...initialState,
      }
    case REFRESH_USER:
      return {
        ...state,
        isRefreshing: true,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
