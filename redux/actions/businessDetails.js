/* eslint-disable import/prefer-default-export */
import { FETCH_BUSINESS_DETAILS } from './types'

export const fetchBusinessDetailsAction = ({ accountId, token }) => ({
  type: FETCH_BUSINESS_DETAILS,
  payload: {
    request: {
      method: 'get',
      url: `reward/business/${accountId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})
