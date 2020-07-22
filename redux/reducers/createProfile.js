import {
  CHECK_USERNAME_SUCCESS,
  CREATE_USER_SUCCESS,
  LOGOUT,
  SET_AUTH_USER,
  SET_AVATAR,
  SET_USERNAME,
  SET_SHOW_AVAILABLE_INDICATOR,
} from '../actions/types'

const initialState = {
  avatar: null,
  username: null,
  isAvailable: false,
  showAvailableIndicator: false,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        ...payload.data,
      }
    case CREATE_USER_SUCCESS:
    case LOGOUT:
      return {
        ...initialState,
      }
    case SET_AUTH_USER:
      return {
        ...state,
        avatar: payload.avatar,
      }
    case SET_AVATAR:
      return {
        ...state,
        avatar: payload,
      }
    case SET_SHOW_AVAILABLE_INDICATOR:
      return {
        ...state,
        showAvailableIndicator: payload,
      }
    case SET_USERNAME:
      return {
        ...state,
        username: payload,
      }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
