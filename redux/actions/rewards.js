/* eslint-disable import/prefer-default-export */
import { FETCH_REWARDS } from './types'

export const fetchRewardsAction = ({ token, ...params }) => ({
  type: FETCH_REWARDS,
  payload: {
    request: {
      method: 'get',
      url: 'rewards',
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
