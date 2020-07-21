import {
  CREATE_POST_SUCCESS,
  FETCH_PLACE_SUCCESS,
  SET_IS_CREATING_POST,
  SET_POST_IMAGE,
  SET_POST_CAPTION,
  SET_POST_LOCATION
} from '../actions/types'

const initialState = {
  isCreatingPost: false,
  caption: '',
  image: null,
  location: null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CREATE_POST_SUCCESS: {
      return {
        ...initialState,
        isCreatingPost: false
      }
    }
    case FETCH_PLACE_SUCCESS:
      return {
        ...state,
        location: payload.data
      }
    case SET_IS_CREATING_POST:
      return {
        ...state,
        isCreatingPost: payload
      }
    case SET_POST_CAPTION:
      return {
        ...state,
        caption: payload
      }
    case SET_POST_IMAGE:
      return {
        ...state,
        image: payload
      }
    case SET_POST_LOCATION:
      return {
        ...state,
        locationId: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer