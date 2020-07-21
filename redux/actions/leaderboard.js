import { FETCH_LEADERBOARD } from '../actions/types'

export const fetchLeaderboardAction = ({ token }) => ({
  type: FETCH_LEADERBOARD,
  payload: {
    request: {
      method: 'get',
      url: 'leaderboard',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})