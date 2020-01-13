import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import currentUser from './currentUser'
import modal from './modal'
import player from './player'
import songs from './songs'
import search from './search'
import tracksQueue from './tracksQueue'
import playlists from './playlists'
import artists from './artists'
import popup from './popup'

const rootReducer = combineReducers({
  auth,
  currentUser,
  modal,
  player,
  songs,
  search,
  tracksQueue,
  playlists,
  artists,
  popup,
  routing: routerReducer
})

export default rootReducer

