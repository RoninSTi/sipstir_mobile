import { FETCH_REDEMPTIONS_SUCCESS, FETCH_REWARDS_SUCCESS } from '../actions/types'

const initialState = {
  rewards: [],
  redemptions: [],
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_REDEMPTIONS_SUCCESS:
      return {
        ...state,
        redemptions: payload.data,
      }
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
