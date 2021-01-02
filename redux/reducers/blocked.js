import { BLOCK_USER_SUCCESS, FETCH_BLOCKED_SUCCESS } from '../actions/types'

const initialState = {
  blockedUsers: [],
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_BLOCKED_SUCCESS:
    case BLOCK_USER_SUCCESS:
      return {
        blockedUsers: payload?.data || [],
        user: null,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
