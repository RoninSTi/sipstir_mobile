import {
  CREATE_POST_SUCCESS,
  LOGOUT,
  SET_IS_CREATING_POST,
  SET_POST_CAPTION,
  SET_POST_IMAGE,
  SET_POST_IMAGE_UPLOAD_PROGRESS,
  SET_POST_IMAGE_URI,
  SET_POST_LOCATION,
} from '../actions/types'

const initialState = {
  isCreatingPost: false,
  caption: '',
  image: null,
  imageURI: null,
  location: null,
  uploadProgress: 0,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CREATE_POST_SUCCESS:
    case LOGOUT:
      return {
        ...initialState,
      }
    case SET_IS_CREATING_POST:
      return {
        ...initialState,
        isCreatingPost: payload,
      }
    case SET_POST_CAPTION:
      return {
        ...state,
        caption: payload,
      }
    case SET_POST_IMAGE:
      return {
        ...state,
        image: payload,
      }
    case SET_POST_IMAGE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: payload,
      }
    case SET_POST_IMAGE_URI:
      return {
        ...state,
        imageURI: payload,
      }
    case SET_POST_LOCATION:
      return {
        ...state,
        location: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
