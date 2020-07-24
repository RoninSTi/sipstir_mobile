import { LOGOUT, SET_AUTH_LOADING, SET_AUTH_USER, SET_LOGGED_IN } from '../actions/types'

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case LOGOUT: {
      return {
        ...initialState,
      }
    }
    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_AUTH_USER:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          ...payload,
        },
      }
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
