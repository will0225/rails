import actionTypes from '../constants/actionTypes'

const initialState = {
  playlists: [],
  activePlaylist: {
    songs: []
  },
  hotPlaylists: [],
  activeHotPlaylist: {
    songs: []
  },
  playlistsFetching: false,
  playlistCreating: false,
  playlistRenaming: false,
  playlistRemoving: false,
  addingToPlaylist: false,
  removingFromPlaylist: false,
  requestingSharedPlaylist: false,
  copyingPlaylist: false,
  hotPlaylistsFetching: false
}

export function playlists(playlists = initialState.playlists, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_RENAME_PLAYLIST:
      return playlists.map(playlist => {
        if (action.playlist.id == playlist.id) {
          return {
            ...playlist,
            ...action.playlist
          }
        } else {
          return playlist
        }
      })
    case actionTypes.RECEIVE_REMOVE_PLAYLIST:
      return playlists.filter(playlist => {
        return playlist.id != action.playlist.id
      })
    case actionTypes.RECEIVE_ADD_TO_PLAYLIST:
      return playlists.map(playlist => {
        if (action.playlist.id == playlist.id) {
          return {
            ...playlist,
            ...action.playlist
          }
        } else {
          return playlist
        }
      })
    case actionTypes.RECEIVE_REMOVE_FROM_PLAYLIST:
      return playlists.map(playlist => {
        if (action.playlist.id == playlist.id) {
          return {
            ...playlist,
            ...action.playlist
          }
        } else {
          return playlist
        }
      })
    default:
      return playlists
  }
}

export function activePlaylist (state = initialState.activePlaylist, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_ADD_TO_PLAYLIST:
      return {
        ...state,
        ...action.playlist
      }
    case actionTypes.RECEIVE_REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        ...action.playlist
      }
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SEARCH_PLAYLISTS:
      return {
        ...state,
        playlistsFetching: action.playlistsFetching
      }
    case actionTypes.RECEIVE_SEARCH_PLAYLISTS:
      return {
        ...state,
        playlistsFetching: action.playlistsFetching,
        playlists: action.playlists
      }
    case actionTypes.REQUEST_HOT_PLAYLISTS:
      return {
        ...state,
        hotPlaylistsFetching: action.hotPlaylistsFetching
      }
    case actionTypes.RECEIVE_HOT_PLAYLISTS:
      return {
        ...state,
        hotPlaylists: action.hotPlaylists,
        hotPlaylistsFetching: action.hotPlaylistsFetching
      }
    case actionTypes.REQUEST_CREATE_PLAYLIST:
      return {
        ...state,
        playlistCreating: action.playlistCreating
      }
    case actionTypes.RECEIVE_CREATE_PLAYLIST:
      return {
        ...state,
        playlistCreating: action.playlistCreating,
        playlists: [...state.playlists, action.playlist]
      }
    case actionTypes.REQUEST_SHARED_PLAYLIST:
      return {
        ...state,
        requestingSharedPlaylist: true
      }
    case actionTypes.RECEIVE_SHARED_PLAYLIST:
      return {
        ...state,
        requestingSharedPlaylist: false,
        playlists: [...state.playlists, action.playlist]
      }
    case actionTypes.REQUEST_COPY_PLAYLIST:
      return {
        ...state,
        copyingPlaylist: true
      }
    case actionTypes.RECEIVE_COPY_PLAYLIST:
      return {
        ...state,
        copyingPlaylist: false,
        playlists: [...state.playlists, action.playlist]
      }
    case actionTypes.REQUEST_RENAME_PLAYLIST:
      return {
        ...state,
        playlistRenaming: action.playlistRenaming
      }
    case actionTypes.RECEIVE_RENAME_PLAYLIST:
      return {
        ...state,
        playlistRenaming: action.playlistRenaming,
        playlists: playlists(state.playlists, action)
      }
    case actionTypes.REQUEST_REMOVE_PLAYLIST:
      return {
        ...state,
        playlistRemoving: action.playlistRemoving
      }
    case actionTypes.RECEIVE_REMOVE_PLAYLIST:
      return {
        ...state,
        playlistRemoving: action.playlistRemoving,
        playlists: playlists(state.playlists, action)
      }
    case actionTypes.REQUEST_ADD_TO_PLAYLIST:
      return {
        ...state,
        addingToPlaylist: action.addingToPlaylist
      }
    case actionTypes.RECEIVE_ADD_TO_PLAYLIST:
      return {
        ...state,
        addingToPlaylist: action.addingToPlaylist,
        playlists: playlists(state.playlists, action)
      }
    case actionTypes.REQUEST_REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        removingFromPlaylist: action.removingFromPlaylist
      }
    case actionTypes.RECEIVE_REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        removingFromPlaylist: action.removingFromPlaylist,
        playlists: playlists(state.playlists, action),
        activePlaylist: activePlaylist(state.activePlaylist, action)
      }
    case actionTypes.SET_ACTIVE_PERSONAL_PLAYLIST:
      return {
        ...state,
        activePlaylist: action.activePlaylist
      }
    case actionTypes.SET_ACTIVE_HOT_PLAYLIST:
      return {
        ...state,
        activeHotPlaylist: action.activePlaylist
      }
    default:
      return state
  }
}
