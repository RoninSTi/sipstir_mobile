import { SET_CURRENT_ROUTE_NAME } from '../actions/types'

const initialState = {
  currentRouteName: null,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case SET_CURRENT_ROUTE_NAME:
      return {
        ...state,
        currentRouteName: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
