import { combineReducers } from 'redux'

import activity from './activity'
import auth from './auth'
import createGuess from './createGuess'
import createPost from './createPost'
import createProfile from './createProfile'
import feed from './feed'
import followTray from './followTray'
import leaderboard from './leaderboard'
import myPosts from './myPosts'
import places from './places'
import post from './post'
import user from './user'
import ui from './ui'

const rootReducer = combineReducers({
  activity,
  auth,
  createGuess,
  createPost,
  createProfile,
  feed,
  followTray,
  leaderboard,
  myPosts,
  places,
  post,
  ui,
  user,
})

export default rootReducer
