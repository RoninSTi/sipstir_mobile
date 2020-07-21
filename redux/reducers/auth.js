import { SET_AUTH_USER } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  user: null,
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_AUTH_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer;