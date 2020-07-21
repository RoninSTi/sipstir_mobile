import { GET_USER_BY_EMAIL } from './types'

export const getUserByEmailAction = ({ email, token }) => ({
  type: GET_USER_BY_EMAIL,
  payload: {
    request: {
      method: 'get',
      url: `/user/email/${email}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
});