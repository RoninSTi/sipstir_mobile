import { SET_PLACES } from '../actions/types'

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
    default:
      return {
        ...state
      }
  }
}

export default reducer
