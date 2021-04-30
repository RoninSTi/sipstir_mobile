import {
  CHEERS_POST,
  CREATE_POST,
  DELETE_POST,
  FETCH_SINGLE_POST,
  FETCH_POST_CHEERS,
  REPORT_POST,
} from './types'

export const cheersPostAction = ({ createdById, postId, token }) => ({
  type: CHEERS_POST,
  payload: {
    request: {
      method: 'post',
      url: `post/${postId}/cheers`,
      data: {
        createdById,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: postId,
    },
  },
})

export const createPostAction = ({ token, ...data }) => ({
  type: CREATE_POST,
  payload: {
    request: {
      method: 'post',
      url: 'post',
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

export const deletePostAction = ({ postId, token }) => ({
  type: DELETE_POST,
  payload: {
    request: {
      method: 'delete',
      url: `post/${postId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: null,
    },
  },
})

export const fetchPostCheersAction = ({ postId, token }) => ({
  type: FETCH_POST_CHEERS,
  payload: {
    request: {
      method: 'get',
      url: `post/${postId}/cheers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: postId,
    },
  },
})

export const fetchSinglePostAction = ({ postId, token, userId }) => ({
  type: FETCH_SINGLE_POST,
  payload: {
    request: {
      method: 'get',
      url: `post/${postId}`,
      params: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
})

export const reportPostAction = ({ postId, token }) => ({
  type: REPORT_POST,
  payload: {
    request: {
      method: 'post',
      url: `post/${postId}/report`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
})
