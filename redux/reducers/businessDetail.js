import { FETCH_BUSINESS_DETAILS_SUCCESS } from '../actions/types'

const initialState = {
  account: null,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_BUSINESS_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
