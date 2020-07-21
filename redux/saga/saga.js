import { all } from 'redux-saga/effects'

import { watchActivity } from './activity'
import { watchAuth } from './auth';
import { watchCreateProfile } from './createProfile';
import { watchFeed } from './feed'
import { watchLeaderboard } from './leaderboard'
import { watchPlaces } from './places'
import { watchPost } from './post'
import { watchUI } from './ui';

export default function* rootSaga() {
  yield all([
    watchActivity(),
    watchAuth(),
    watchCreateProfile(),
    watchFeed(),
    watchLeaderboard(),
    watchPlaces(),
    watchPost(),
    watchUI()
  ])
};
