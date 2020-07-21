import { LOGOUT, SET_PLACES, SELECT_PLACE_SUCCESS } from '../actions/types'

const initialState = {
  currentLocation: null,
  places: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PLACES: {
      return {
        ...state,
        places: payload
      }
    }
    case LOGOUT:
    case SELECT_PLACE_SUCCESS:
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer
