import actionTypes from '../constants/actionTypes'
import axios from 'axios'
import { API_URL } from '../constants/api'
import { openModal, closeModal } from './modal'
import { showTemporaryPopup } from './popup'

export function requestFetchPlaylists() {
  return {
    type: actionTypes.REQUEST_SEARCH_PLAYLISTS,
    playlistsFetching: true
  }
}

export function receiveFetchPlaylists(playlists) {
  return {
    type: actionTypes.RECEIVE_SEARCH_PLAYLISTS,
    playlistsFetching: false,
    playlists
  }
}

export function requestFetchHotPlaylists() {
  return {
    type: actionTypes.REQUEST_HOT_PLAYLISTS,
    hotPlaylistsFetching: true
  }
}

export function receiveFetchHotPlaylists(hotPlaylists) {
  return {
    type: actionTypes.RECEIVE_HOT_PLAYLISTS,
    hotPlaylistsFetching: false,
    hotPlaylists
  }
}

export function fetchPlaylists(callback) {
  return async (dispatch, getState) => {
    dispatch(requestFetchPlaylists())

    axios({
      method: 'get',
      url: API_URL + '/playlists.json',
    })
    .then(data => {
      dispatch(receiveFetchPlaylists(data.data))
      if (callback) {
        callback(data.data, dispatch)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function fetchHotPlaylists(callback) {
  return async (dispatch, getState) => {
    dispatch(requestFetchHotPlaylists())

    axios({
      method: 'get',
      url: API_URL + '/playlists.json',
      params: {
        hot: true
      }
    })
    .then(data => {
      dispatch(receiveFetchHotPlaylists(data.data))
      if (callback) {
        callback(data.data, dispatch)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function requestCreatePlaylist() {
  return {
    type: actionTypes.REQUEST_CREATE_PLAYLIST,
    playlistCreating: true
  }
}

export function receiveCreatePlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_CREATE_PLAYLIST,
    playlistCreating: false,
    playlist
  }
}

export function requestRenamePlaylist() {
  return {
    type: actionTypes.REQUEST_RENAME_PLAYLIST,
    playlistRenaming: true
  }
}

export function receiveRenamePlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_RENAME_PLAYLIST,
    playlistRenaming: false,
    playlist
  }
}

export function requestRemovePlaylist() {
  return {
    type: actionTypes.REQUEST_REMOVE_PLAYLIST,
    playlistRemoving: true
  }
}

export function receiveRemovePlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_REMOVE_PLAYLIST,
    playlistRemoving: false,
    playlist
  }
}

export function requestAddToPlaylist() {
  return {
    type: actionTypes.REQUEST_ADD_TO_PLAYLIST,
    addingToPlaylist: true
  }
}

export function receiveAddToPlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_ADD_TO_PLAYLIST,
    addingToPlaylist: false,
    playlist
  }
}

export function requestRemoveFromPlaylist() {
  return {
    type: actionTypes.REQUEST_REMOVE_FROM_PLAYLIST,
    removingFromPlaylist: true
  }
}

export function requestSharedPlaylist() {
  return {
    type: actionTypes.REQUEST_SHARED_PLAYLIST,
    requestingSharedPlaylist: true
  }
}

export function receiveSharedPlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_SHARED_PLAYLIST,
    requestingSharedPlaylist: false,
    playlist
  }
}

export function receiveRemoveFromPlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_REMOVE_FROM_PLAYLIST,
    removingFromPlaylist: false,
    playlist
  }
}

export function requestCopyPlaylist() {
  return {
    type: actionTypes.REQUEST_COPY_PLAYLIST,
    copyingPlaylist: true
  }
}

export function receiveCopyPlaylist(playlist) {
  return {
    type: actionTypes.RECEIVE_COPY_PLAYLIST,
    copyingPlaylist: false,
    playlist
  }
}

export function copyPlaylist(playlistId) {
  return async (dispatch, getState) => {
    dispatch(requestCopyPlaylist())

    axios({
      method: 'post',
      url: API_URL + `/playlists/${playlistId}/copy`
    })
    .then(playlist => {
      dispatch(receiveCopyPlaylist(playlist.data))
      dispatch(showTemporaryPopup('Copied to My Music', 'message'))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function createPlaylist(title, image, callback) {
  return async (dispatch, getState) => {
    dispatch(requestCreatePlaylist())

    let formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    
    axios({
      method: 'post',
      url: API_URL + '/playlists.json',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(playlist => {
      dispatch(receiveCreatePlaylist(playlist.data))
      dispatch(setActivePlaylist(playlist.data))
      callback()
      dispatch(showTemporaryPopup('Playlist created', 'message'))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function renamePlaylist(id, title) {
  return async (dispatch, getState) => {
    dispatch(requestRenamePlaylist())

    axios({
      method: 'patch',
      url: API_URL + '/playlists/' + id,
      data: {
        title
      }
    })
    .then(playlist => {
      dispatch(receiveRenamePlaylist(playlist.data))
      dispatch(setActivePlaylist(playlist.data))
      dispatch(closeModal())
      dispatch(showTemporaryPopup('Playlist renamed', 'message'))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function setActivePlaylist(activePlaylist) {
  if (activePlaylist.type == 'Playlists::Hot') {
    return {
      type: actionTypes.SET_ACTIVE_HOT_PLAYLIST,
      activePlaylist
    }
  } else {
    return {
      type: actionTypes.SET_ACTIVE_PERSONAL_PLAYLIST,
      activePlaylist
    }
  }
}

export function removePlaylist(id) {
  return async (dispatch, getState) => {
    dispatch(requestRemovePlaylist())

    axios({
      method: 'delete',
      url: API_URL + '/playlists/' + id
    })
    .then(playlist => {
      dispatch(receiveRemovePlaylist(playlist.data))
      if (getState().playlists.playlists[0]) {
        dispatch(setActivePlaylist(getState().playlists.playlists[0]))
      }
      dispatch(closeModal())
    })
    .catch(error => {
      console.log(error)
      dispatch(showTemporaryPopup(["Can't remove this playlist", error.message]), 'error')
      dispatch(receiveRemovePlaylist({}))
      dispatch(closeModal())
    })
  }
}

export function removeSharedPlaylist(id) {
  return async (dispatch, getState) => {
    dispatch(requestRemovePlaylist())

    axios({
      method: 'delete',
      url: API_URL + '/users_playlists/' + id
    })
    .then(playlist => {
      dispatch(receiveRemovePlaylist(playlist.data))
      if (getState().playlists.playlists[0]) {
        dispatch(setActivePlaylist(getState().playlists.playlists[0]))
      }
      dispatch(closeModal())
    })
    .catch(error => {
      console.log(error)
      dispatch(showTemporaryPopup(["Can't remove this playlist", error.message]), 'error')
      dispatch(receiveRemovePlaylist({}))
      dispatch(closeModal())
    })
  }
}

export function addToPlaylist(playlistId, trackId) {
  return async (dispatch, getState) => {
    dispatch(requestAddToPlaylist())

    axios({
      method: 'post',
      url: API_URL + '/playlists_songs/',
      data: {
        playlists_song: {
          playlist_id: playlistId,
          song_id: trackId
        }
      }
    })
    .then(playlist => {
      dispatch(receiveAddToPlaylist(playlist.data))
      if (playlist.data.id == getState().playlists.activePlaylist.id) {
        dispatch(setActivePlaylist(playlist.data))
      }
      dispatch(closeModal())
    })
    .catch(error => {
      console.log(error)
      dispatch(receiveAddToPlaylist({}))
      dispatch(closeModal())
    })
  }
}

export function removeFromPlaylist(playlistId, trackId) {
  return async (dispatch, getState) => {
    dispatch(requestRemoveFromPlaylist())

    axios({
      method: 'delete',
      url: API_URL + '/playlists_songs/',
      data: {
        playlists_song: {
          playlist_id: playlistId,
          song_id: trackId
        }
      }
    })
    .then(playlist => {
      dispatch(receiveRemoveFromPlaylist(playlist.data))
      dispatch(closeModal())
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function getSharedPlaylist(playlistToken, callback) {
  return async (dispatch, getState) => {
    dispatch(requestSharedPlaylist())

    axios({
      method: 'post',
      url: API_URL + '/users_playlists',
      data: {
        token: playlistToken
      }
    })
    .then(playlist => {
      dispatch(receiveSharedPlaylist(playlist.data))
      dispatch(showTemporaryPopup('Playlist added', 'message'))
      callback(playlist.data)
    })
    .catch(error => {
      console.log(error)
      dispatch(showTemporaryPopup(["Can't add this playlist", error.message], 'error'))
      callback()
    })
  }
}
