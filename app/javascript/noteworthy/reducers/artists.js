import actionTypes from '../constants/actionTypes'

const initialState = {
  activeArtist: {
    roles: [],
    image: {
      medium: {}
    },
    songs: []
  },
  artistFetching: false
}

export function activeArtist(state = initialState.activeArtist, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_FETCH_ARTIST:
      return {
        ...state,
        ...action.activeArtist
      }
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_FETCH_ARTIST:
      return {
        ...state,
        artistFetching: action.artistFetching
      }
    case actionTypes.RECEIVE_FETCH_ARTIST:
      return {
        ...state,
        artistFetching: action.artistFetching,
        activeArtist: activeArtist(state.activeArtist, action)
      }
    default:
      return state
  }
}