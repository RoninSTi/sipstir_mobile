import { FETCH_PLACES, FETCH_PLACE } from './types'

export const fetchPlaceAction = ({ placeId, token }) => ({
  type: FETCH_PLACE,
  payload: {
    request: {
      method: 'post',
      url: `location/${placeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setLoading: {
      meta: placeId,
    },
  },
})

export const fetchPlacesAction = ({ includeNoIdea = false, params, url }) => ({
  type: FETCH_PLACES,
  payload: {
    client: 'googlePlace',
    request: {
      method: 'get',
      url,
      params,
    },
    includeNoIdea,
    setLoading: {
      meta: null,
    },
  },
})
