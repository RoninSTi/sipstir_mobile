import { SET_LOADING, SET_SHOW_NOTIFICATION_MODAL } from '../actions/types'

const initialState = {
  isLoading: [],
  showNotificationModal: false,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_SHOW_NOTIFICATION_MODAL:
      return {
        ...state,
        showNotificationModal: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
