import { FETCH_ACTIVITY_SUCCESS, REFRESH_ACTIVITY } from '../actions/types'

const initialState = {
  activities: [],
  isRefreshing: false,
  page: 1,
  pageSize: 100
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action
  
  switch (type) {
    case FETCH_ACTIVITY_SUCCESS: {
      return {
        ...state,
        activities: payload.data,
        isRefreshing: false
      }
    }
    case REFRESH_ACTIVITY: 
      return {
        ...state,
        page: 1,
        isRefreshing: true
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer