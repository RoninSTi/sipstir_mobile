import { GET_USER_BY_EMAIL, FACEBOOK_AUTH } from './types'

export const facebookAuthAction = ({ fbToken }) => ({
  type: FACEBOOK_AUTH,
  payload: {
    request: {
      method: 'post',
      url: 'auth/facebook',
      data: {
        fbToken,
      },
    },
  },
})

export const getUserByEmailAction = ({ email, token }) => ({
  type: GET_USER_BY_EMAIL,
  payload: {
    request: {
      method: 'get',
      url: `/user/email/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
})
