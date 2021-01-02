import { BLOCK_USER, FETCH_BLOCKED } from './types'

export const blockUserAction = ({ blockedId, token }) => ({
  type: BLOCK_USER,
  payload: {
    request: {
      method: 'post',
      url: `block/${blockedId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: blockedId,
    },
  },
})

export const fetchBlockedAction = ({ token }) => ({
  type: FETCH_BLOCKED,
  payload: {
    request: {
      method: 'get',
      url: 'block',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})
