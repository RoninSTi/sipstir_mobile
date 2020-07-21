import { FETCH_ACTIVITY } from './types'

export const fetchActivityAction = ({ token, userId, ...params }) => ({
  type: FETCH_ACTIVITY,
  payload: {
    request: {
      method: 'get',
      url: `activity/${userId}`,
      params,
      headers: {
        Authorization: `Bearer ${token }`
      }
    }
  }
})