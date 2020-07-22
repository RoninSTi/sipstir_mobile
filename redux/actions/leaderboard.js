/* eslint-disable import/prefer-default-export */
import { FETCH_LEADERBOARD } from './types'

export const fetchLeaderboardAction = ({ token }) => ({
  type: FETCH_LEADERBOARD,
  payload: {
    request: {
      method: 'get',
      url: 'leaderboard',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})
