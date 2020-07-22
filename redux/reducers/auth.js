import { LOGOUT, SET_AUTH_USER } from '../actions/types'

const initialState = {
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
    case SET_AUTH_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
