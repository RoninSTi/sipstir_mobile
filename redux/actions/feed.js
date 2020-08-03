/* eslint-disable import/prefer-default-export */
import { FETCH_FEED } from './types'

export const fetchFeedAction = ({ feedType, token, userId, ...params }) => ({
  type: FETCH_FEED,
  payload: {
    request: {
      method: 'get',
      url: `feed/${feedType}/user/${userId}`,
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})
