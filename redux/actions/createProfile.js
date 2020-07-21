import { CHECK_USERNAME, CREATE_PROFILE } from '../actions/types'

export const checkUsernameAction = ({ username, token }) => ({
  type: CHECK_USERNAME,
  payload: {
    request: {
      method: 'get',
      url: `user/checkusername/${username}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const createProfileAction = ({ userId, token, ...userData }) => ({
  type: CREATE_PROFILE,
  payload: {
    request: {
      method: 'put',
      url: `user/${userId}`,
      data: {
        ...userData
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})