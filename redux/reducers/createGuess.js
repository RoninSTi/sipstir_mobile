import {
  ATTEMPT_GUESS,
  CREATE_GUESS_SUCCESS,
  LOGOUT,
  SET_GUESS_LOCATION,
  SET_GUESS_TEXT,
  SET_IS_GUESSING,
} from '../actions/types'

const initialState = {
  isGuessing: false,
  location: null,
  postId: null,
  text: '',
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case ATTEMPT_GUESS:
      return {
        ...state,
        isGuessing: true,
        postId: payload.postId,
      }
    case CREATE_GUESS_SUCCESS:
    case LOGOUT:
      return {
        ...initialState,
      }
    case SET_GUESS_LOCATION:
      return {
        ...state,
        location: payload,
      }
    case SET_GUESS_TEXT:
      return {
        ...state,
        text: payload,
      }
    case SET_IS_GUESSING:
      return {
        ...state,
        isGuessing: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
