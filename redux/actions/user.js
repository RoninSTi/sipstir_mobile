import { CREATE_USER, FOLLOW_USER, UPDATE_USER,  } from "./types"

export const createUserAction = ({ token, ...userData }) => ({
  type: CREATE_USER,
  payload: {
    request: {
      method: 'post',
      url: 'user',
      data: {
        ...userData
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const followUserAction = ({ followingId, token, userId }) => ({
  type: FOLLOW_USER,
  payload: {
    request: {
      method: 'post',
      url: `user/${followingId}/follow`,
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: followingId
    }
  }
})

export const updateUserAction = ({ userId, token, ...userData }) => ({
  type: UPDATE_USER,
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