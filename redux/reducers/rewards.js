import { FETCH_REWARDS_SUCCESS } from '../actions/types'

const initialState = {
  rewards: [],
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_REWARDS_SUCCESS:
      return {
        ...state,
        rewards: payload.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
