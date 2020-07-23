import { all } from 'redux-saga/effects'

import { watchActivity } from './activity'
import { watchAuth } from './auth'
import { watchCreateProfile } from './createProfile'
import { watchFeed } from './feed'
import { watchGuess } from './guess'
import { watchLeaderboard } from './leaderboard'
import { watchMyPosts } from './myPosts'
import { watchPlaces } from './places'
import { watchPost } from './post'
import { watchUI } from './ui'
import { watchUser } from './user'

export default function* rootSaga() {
  yield all([
    watchActivity(),
    watchAuth(),
    watchCreateProfile(),
    watchGuess(),
    watchFeed(),
    watchLeaderboard(),
    watchMyPosts(),
    watchPlaces(),
    watchPost(),
    watchUI(),
    watchUser(),
  ])
}
