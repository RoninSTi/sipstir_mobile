import {
  LOGOUT,
  RESET_DROPDOWN_DATA,
  SET_LOADING,
  SET_DROPDOWN_DATA,
  SET_SHOW_NOTIFICATION_MODAL,
} from '../actions/types'

const initialState = {
  dropdownData: null,
  isLoading: [],
  showDropdownAlert: false,
  showNotificationModal: false,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case LOGOUT:
      return {
        ...initialState,
      }
    case RESET_DROPDOWN_DATA:
      return {
        ...state,
        dropdownData: null,
        showDropdownAlert: false,
      }
    case SET_DROPDOWN_DATA:
      return {
        ...state,
        dropdownData: payload,
        showDropdownAlert: true,
      }
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
