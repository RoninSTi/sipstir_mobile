import { FETCH_PLACE_SUCCESS, LOGOUT, SET_PLACES, SET_SHOW_LOCATION_MODAL } from '../actions/types'

const initialState = {
  currentLocation: null,
  includeNoIdea: false,
  places: [],
  showLocationModal: false,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case LOGOUT:
    case FETCH_PLACE_SUCCESS:
      return {
        ...initialState,
      }
    case SET_PLACES: {
      return {
        ...state,
        places: payload,
      }
    }
    case SET_SHOW_LOCATION_MODAL:
      return {
        ...state,
        showLocationModal: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
