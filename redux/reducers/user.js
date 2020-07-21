import { CREATE_PROFILE_SUCCESS, CREATE_USER_SUCCESS, FOLLOW_USER_SUCCESS, GET_USER_BY_EMAIL_SUCCESS, UPDATE_USER_SUCCESS } from '../actions/types'

const initialState = {
  avatar: null,
  username: null,
  points: 0,
  pointsBalance: 0,
  createdAt: null,
  updatedAt: null,
  alltimeLeaderboardPosition: 0,
  followers: [],
  following: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CREATE_PROFILE_SUCCESS:
    case CREATE_USER_SUCCESS:
    case FOLLOW_USER_SUCCESS:
    case GET_USER_BY_EMAIL_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...payload.data
      }
    default: 
      return {
        ...state
      }
  }
}

export default reducer