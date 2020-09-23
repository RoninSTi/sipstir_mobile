/* eslint-disable import/prefer-default-export */
import { FETCH_REDEMPTIONS, FETCH_REWARDS, REDEEM_REWARD } from './types'

export const fetchRedemptionsAction = ({ token, userId }) => ({
  type: FETCH_REDEMPTIONS,
  payload: {
    request: {
      method: 'get',
      url: `reward/redemptions/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})

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

export const redeemRewardAction = ({ rewardId, token }) => ({
  type: REDEEM_REWARD,
  payload: {
    request: {
      method: 'post',
      url: `reward/${rewardId}/redeem`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: rewardId,
    },
  },
})
