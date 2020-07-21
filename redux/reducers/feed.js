import { FETCH_FEED_SUCCESS, REFRESH_FEED, SET_FEED_TYPE, SET_POSTS } from '../actions/types'

const initialState = {
  isRefreshing: false,
  feedType: 'main',
  page: 1,
  pageSize: 100,
  posts: [],
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        isRefreshing: false,
        posts: payload.data
      }
    case REFRESH_FEED:
      return {
        ...state,
        isRefreshing: true,
        page: 1
      }
    case SET_FEED_TYPE:
      return {
        ...state,
        feedType: payload
      }
    case SET_POSTS:
      return {
        ...state,
        posts: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer