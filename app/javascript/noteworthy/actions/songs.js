import actionTypes from '../constants/actionTypes'
import { API_URL } from '../constants/api'
import { playPlayer } from './player'
import { setTracksQueue } from './tracksQueue'
import axios from 'axios'

export function requestSearchTracks() {
  return {
    type: actionTypes.REQUEST_SEARCH_TRACKS,
    tracksAreSearching: true
  }
}

export function receiveSearchTracks(tracks, pagination) {
  return {
    type: actionTypes.RECEIVE_SEARCH_TRACKS,
    searchResults: tracks,
    pagination: pagination,
    tracksAreSearching: false
  }
}

export function searchTracks(filters, page = 1) {
  return async (dispatch, getState) => {
    dispatch(requestSearchTracks())
    
    axios({
      method: 'get',
      url: API_URL + '/songs.json',
      params: {
        ...filters,
        page
      }
    })
    .then(response => {
      if (page == 1) {
        dispatch(clearSearchResults())
      }
      dispatch(receiveSearchTracks(response.data.songs, response.data.pagination))
      console.log(response.data.songs)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function clearSearchResults() {
  return {
    type: actionTypes.CLEAR_SEARCH_RESULTS
  }
}

export function searchTracksByCurrentFilters() {
  return (dispatch, getState) => {
    dispatch(searchTracks(getState().search.currentFilters))
  }
}

export function requestFetchTrack() {
  return {
    type: actionTypes.REQUEST_FETCH_TRACK
  }
}

export function fetchTrack(trackId) {
  return async (dispatch, getState) => {
    dispatch(requestFetchTrack())

    axios({
      method: 'get',
      url: API_URL + `/songs/${trackId}.json`
    })
    .then(response => {
      dispatch(receiveFetchedTrack())
      dispatch(playTrack(response.data))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function receiveFetchedTrack(currentTrack) {
  return {
    type: actionTypes.RECEIVE_FETCHED_TRACK
  }
}

export function setTrack(currentTrack) {
  return {
    type: actionTypes.SET_TRACK,
    currentTrack
  }
}

export function playTrack(currentTrack, allPlaylistTracks) {
  return function (dispatch) {
    if (allPlaylistTracks) {
      dispatch(setTracksQueue(allPlaylistTracks))
    }
    dispatch(setTrack(currentTrack))
    dispatch(playPlayer())
  }
}

export function setHotTracks(hotTracks) {
  return {
    type: actionTypes.SET_HOT_TRACKS,
    hotTracks
  }
}

export function fetchHotTracks(params, callback) {
  return async (dispatch, getState) => {
    axios({
      method: 'get',
      url: API_URL + '/songs.json',
      params: {
        hot: true,
        ...params
      }
    })
    .then(response => {
      let hotTracks = response.data.songs.reverse()
      dispatch(setHotTracks(hotTracks))
      if (callback) {
        callback(hotTracks)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
}