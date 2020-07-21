import { FETCH_LEADERBOARD_SUCCESS, REFRESH_LEADERBOARD } from '../actions/types'

const initialState = {
  isRefreshing: false,
  leaders: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        isRefreshing: false,
        leaders: payload.data
      }
    case REFRESH_LEADERBOARD:
      return {
        ...state,
        isRefreshing: true
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer