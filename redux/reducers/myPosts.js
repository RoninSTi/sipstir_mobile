import { LOGOUT, REFRESH_MY_FEED, SET_MY_POSTS } from '../actions/types'

const initialState = {
  isRefreshing: false,
  page: 1,
  pageSize: 100,
  posts: [],
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case LOGOUT: 
      return {
        ...initialState
      }
    case REFRESH_MY_FEED:
      return {
        ...state,
        isRefreshing: true,
        page: 1
      }
    case SET_MY_POSTS:
      return {
        ...state,
        isRefreshing: false,
        posts: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer