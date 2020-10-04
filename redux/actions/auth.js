import { GET_USER_BY_EMAIL, FACEBOOK_AUTH, AUTH_EMAIL } from './types'

export const emailAuthAction = ({ email, password }) => ({
  type: AUTH_EMAIL,
  payload: {
    request: {
      method: 'post',
      url: 'auth/login',
      data: {
        email,
        password,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})

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

export const registerAction = ({ email, password }) => ({
  type: AUTH_EMAIL,
  payload: {
    request: {
      method: 'post',
      url: 'auth/register',
      data: {
        email,
        password,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})
