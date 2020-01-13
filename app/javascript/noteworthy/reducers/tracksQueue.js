import actionTypes from '../constants/actionTypes'

const initialState = {
  tracks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRACKS_QUEUE:
      return {
        ...state,
        tracks: action.tracks
      }
    case actionTypes.ADD_TO_QUEUE:
      return {
        ...state,
        tracks: [...state.tracks, action.track]
      }
    case actionTypes.REMOVE_FROM_QUEUE:
      return {
        ...state,
        tracks: state.tracks.filter(track => track.id != action.trackId)
      }
    default:
      return state
  }
}