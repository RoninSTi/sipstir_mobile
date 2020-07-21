import { combineReducers } from 'redux';

import activity from './activity'
import auth from './auth';
import createPost from './createPost'
import createProfile from './createProfile'
import feed from './feed'
import leaderboard from './leaderboard'
import myPosts from './myPosts'
import places from './places'
import post from './post'
import user from './user';
import ui from './ui';

const rootReducer = combineReducers({
  activity,
  auth,
  createPost,
  createProfile,
  feed,
  leaderboard,
  myPosts,
  places,
  post,
  ui,
  user
});

export default rootReducer;