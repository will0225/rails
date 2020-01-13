import actionTypes from '../constants/actionTypes'

const initialState = {
  searchResults: [],
  tracksAreSearching: false,
  pagination: {
    current_page: 1
  },
  currentTrack: {
    id: '',
    audio: {
      file: {
        url: '',
        compressed_mp3: {
          url: ''
        }
      },
      duration: 0
    },
    participants: [],
    genres: [],
    moods: [],
    instruments: [],
    image: {
      url: '',
      small: {},
      medium: {}
    },
    time_markers: [],
    version: 'full'
  },
  trackFetching: false,
  hotTracks: []
}

function currentTrack(state = initialState.currentTrack, action) {
  switch (action.type) {
    case actionTypes.SET_TRACK:
      return {
        ...state,
        ...action.currentTrack
      }
    default:
      return state
  }
}

function searchResults(state = initialState.searchResults, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_SEARCH_TRACKS:
      return [
        ...state,
        ...action.searchResults
      ]
  }
}

function pagination(state = initialState.pagination, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_SEARCH_TRACKS:
      return {
        ...state,
        ...action.pagination
      }
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SEARCH_TRACKS:
      return {
        ...state,
        tracksAreSearching: action.tracksAreSearching
      }
    case actionTypes.RECEIVE_SEARCH_TRACKS:
      return {
        ...state,
        tracksAreSearching: action.tracksAreSearching,
        searchResults: searchResults(state.searchResults, action),
        pagination: pagination(state.pagination, action)
      }
    case actionTypes.SEARCH_TRACKS:
      return {
        ...state
      }
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: []
      }
    case actionTypes.REQUEST_FETCH_TRACK:
      return {
        ...state,
        trackFetching: true
      }
    case actionTypes.RECEIVE_FETCHED_TRACK:
      return {
        ...state,
        trackFetching: false
      }
    case actionTypes.SET_TRACK:
      return {
        ...state,
        currentTrack: currentTrack(state.currentTrack, action)
      }
    case actionTypes.SET_HOT_TRACKS:
      return {
        ...state,
        hotTracks: action.hotTracks
      }
    default:
      return state
  }
}
