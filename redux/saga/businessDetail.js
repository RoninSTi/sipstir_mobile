// /* eslint-disable import/prefer-default-export */
// import { put, takeEvery, select } from 'redux-saga/effects'

// import {
//   // ATTEMPT_GUESS,
//   // CREATE_GUESS_SUCCESS,
//   // FETCH_PLACE_SUCCESS,
//   // SET_GUESS_LOCATION,
//   NAVIGATE_TO_BUSINESS_DETAIL,
// } from '../actions/types'

// import { navigate } from '../../navigation/rootNavigation'

// const getIsGuessing = (state) => state.createGuess.isGuessing

// const getToken = (state) => state.auth.token

// function onAttemptGuess(action) {
//   const { payload: params } = action

//   navigate('Guess', {
//     screen: 'GuessSelectLocation',
//     params,
//   })
// }

// function onCreateGuessSuccess(action) {
//   const { data: response } = action.payload

//   const { post, reward } = response

//   navigate('Main', {
//     screen: 'Root',
//     params: {
//       screen: 'FeedStack',
//       params: {
//         screen: 'GuessInterstitial',
//         params: {
//           postId: post.id,
//           reward,
//         },
//       },
//     },
//   })
// }

// function* onNavigationToBusinessDetail(action) {
//   const { payload: accountId } = action

//   const token = yield select(getToken)

//   yield put(fetchBusinessDetailsAction({ accountId, token }))
// }

// export function* watchBusinessDetail() {
//   yield takeEvery(NAVIGATE_TO_BUSINESS_DETAIL, onNavigationToBusinessDetail)
// }
