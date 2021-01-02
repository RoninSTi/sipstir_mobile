import { combineReducers } from 'redux'

import activity from './activity'
import auth from './auth'
import blocked from './blocked'
import createGuess from './createGuess'
import createPost from './createPost'
import createProfile from './createProfile'
import feed from './feed'
import followTray from './followTray'
import leaderboard from './leaderboard'
import myPosts from './myPosts'
import nav from './nav'
import places from './places'
import post from './post'
import rewards from './rewards'
import user from './user'
import ui from './ui'

const rootReducer = combineReducers({
  activity,
  auth,
  blocked,
  createGuess,
  createPost,
  createProfile,
  feed,
  followTray,
  leaderboard,
  myPosts,
  nav,
  places,
  post,
  rewards,
  ui,
  user,
})

export default rootReducer
