import { FETCH_FEED } from "./types";

export const fetchFeedAction = ({ page, pageSize, feedType, token, userId }) => ({
  type: FETCH_FEED,
  payload: {
    request: {
      method: 'get',
      url: `feed/${feedType}/user/${userId}`,
      params: {
        page,
        pageSize
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})