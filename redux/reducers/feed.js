import {
  LOGOUT,
  REFRESH_FEED,
  SET_FEED_TYPE,
  SET_LOCATION_POSTS,
  SET_POSTS,
  SET_SHOULD_SCROLL_UP,
} from '../actions/types'

const initialState = {
  isRefreshing: false,
  feedType: 'main',
  page: 1,
  pageSize: 100,
  posts: {
    following: [],
    location: [],
    main: [],
    nearby: [],
  },
  shouldScrollUp: false,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case LOGOUT:
      return {
        ...initialState,
      }
    case REFRESH_FEED:
      return {
        ...state,
        isRefreshing: true,
        page: 1,
      }
    case SET_FEED_TYPE:
      return {
        ...state,
        feedType: payload,
      }
    case SET_LOCATION_POSTS:
      return {
        ...state,
        isRefreshing: false,
        posts: {
          ...state.posts,
          location: payload,
        },
      }
    case SET_POSTS:
      return {
        ...state,
        isRefreshing: false,
        posts: {
          ...state.posts,
          [state.feedType]: payload,
        },
      }
    case SET_SHOULD_SCROLL_UP:
      return {
        ...state,
        shouldScrollUp: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
