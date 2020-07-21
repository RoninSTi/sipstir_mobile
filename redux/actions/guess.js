import { CREATE_COMMENT } from './types'

export const createCommentAction = ({ guessId, token, ...data }) => ({
  type: CREATE_COMMENT,
  payload: {
    request: {
      method: 'post',
      url: `guess/${guessId}/comment`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: guessId
    }
  }
})