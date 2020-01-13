import { push } from 'react-router-redux'
import axios from 'axios'

import { setCurrentUser } from './currentUser'

import { fetchSearchFiltersData } from './search'
import { fetchHotTracks, setTrack } from './songs'
import { setTracksQueue } from './tracksQueue'
import { fetchPlaylists, setActivePlaylist, fetchHotPlaylists } from './playlists'

import actionTypes from '../constants/actionTypes'
import { API_URL } from '../constants/api'
import setAuthorizationToken from '../utils/setAuthorizationToken'


/*************** LOGIN **************/

function requestLogin() {
  return {
    type: actionTypes['LOGIN_REQUEST'],
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin() {
  return {
    type: actionTypes['LOGIN_SUCCESS'],
    isFetching: false,
    userIsFetching: false,
    isAuthenticated: true
  }
}

function loginError(loginErrors) {
  return {
    type: actionTypes['LOGIN_FAILURE'],
    isFetching: false,
    isAuthenticated: false,
    loginErrors
  }
}

export function loginUser(data) {
  return async(dispatch) => {
    dispatch(requestLogin())

    axios({
      method: 'post',
      url: API_URL + '/sessions',
      data: {
        user: {
          username: data.username,
          password: data.password
        }
      },
      headers: {"Content-Type": "application/json; charset=utf-8"}
    })
    .then(response => {
      const access_token = response.headers["access-token"]
      localStorage.setItem('Access-Token', access_token)
      setAuthorizationToken(access_token)

      dispatch(setCurrentUser(response.data))
      dispatch(receiveLogin())
      dispatch(fetchDataForAuthenticated())

      dispatch(push('/hot'))
    })
    .catch(error => {
      error.response ? dispatch(loginError(error.response.data.message)) : dispatch(loginError("Unknown error"))
    })
  }
}

/*************** LOGOUT *************/

function requestLogout() {
  return {
    type: actionTypes['LOGOUT_REQUEST'],
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: actionTypes['LOGOUT_SUCCESS'],
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('Access-Token')
    setAuthorizationToken(false)
    dispatch(receiveLogout())
  }
}

export function fetchDataForAuthenticated() {
  return (dispatch, getState) => {
    dispatch(fetchSearchFiltersData())
    dispatch(fetchHotTracks(null, (hotTracks) => {
      if (hotTracks[0]) {
        dispatch(setTrack(hotTracks[0]))
        dispatch(setTracksQueue(hotTracks))
      }
    }))
    dispatch(fetchHotPlaylists((hotPlaylists, dispatch) => {
      if (!getState().playlists.activeHotPlaylist || !getState().playlists.activeHotPlaylist.id) {
        dispatch(setActivePlaylist(hotPlaylists[0]))
      }
    }))
    dispatch(fetchPlaylists((playlists, dispatch) => {
      if (!getState().playlists.activePlaylist || !getState().playlists.activePlaylist.id) {
        dispatch(setActivePlaylist(playlists[0]))
      }
    }))
  }
}