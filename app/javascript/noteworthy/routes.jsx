import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/authWrappers'

import App from './components/App'
import Auth from './components/layouts/Auth'
import Main from './components/layouts/Main'

import LoginPage from './components/LoginPage'
import HotPage from './components/HotPage'
import SearchPage from './components/SearchPage'
import ArtistPage from './components/ArtistPage'
import PlaylistsPage from './components/PlaylistsPage'
import SettingsPage from './components/SettingsPage'

const routes = (
  <Route path="/" component={App}>
    <Route component={UserIsNotAuthenticated(Auth)}>
      <Route path="login" component={LoginPage} />
    </Route>
    <Route component={UserIsAuthenticated(Main)}>
      <Route path="search" component={SearchPage} />
      <Route path="hot" component={HotPage} />
      <Route path="artists/:id" component={ArtistPage} />
      <Route path="playlists" component={PlaylistsPage} />
      <Route path="settings" component={SettingsPage} />
      <Route path="share/:token" component={PlaylistsPage} />
    </Route>
  </Route>
)
export default routes
