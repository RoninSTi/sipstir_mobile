import { AUTH_APPLE, AUTH_EMAIL, AUTH_FORGOT, FACEBOOK_AUTH, GET_USER_BY_EMAIL } from './types'

export const appleAuthAction = ({ identityToken }) => ({
  type: AUTH_APPLE,
  payload: {
    request: {
      method: 'post',
      url: 'auth/apple',
      data: {
        identityToken,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})

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

export const forgotAuthAction = ({ email }) => ({
  type: AUTH_FORGOT,
  payload: {
    request: {
      method: 'post',
      url: 'auth/forgot',
      data: {
        email
      }
    }
  }
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
