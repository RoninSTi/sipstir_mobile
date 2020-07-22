import { CREATE_COMMENT, CREATE_GUESS } from './types'

export const createCommentAction = ({ guessId, token, ...data }) => ({
  type: CREATE_COMMENT,
  payload: {
    request: {
      method: 'post',
      url: `guess/${guessId}/comment`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: guessId,
    },
  },
})

export const createGuessAction = ({ postId, token, ...data }) => ({
  type: CREATE_GUESS,
  payload: {
    request: {
      method: 'post',
      url: `post/${postId}/guess`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})
