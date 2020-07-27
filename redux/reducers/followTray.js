import { CLOSE_FOLLOWTRAY, SET_FOLLOWTRAY_USER } from '../actions/types'

const initialState = {
  isVisible: false,
  user: null,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CLOSE_FOLLOWTRAY:
      return {
        isVisible: false,
        user: null,
      }
    case SET_FOLLOWTRAY_USER:
      return {
        isVisible: true,
        user: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
