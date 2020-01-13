import actionTypes from '../constants/actionTypes'

const initialState = {
  playing: false,
  position: 0,
  volume: 0.7
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_PLAYER:
      return {
        ...state,
        playing: true
      }
    case actionTypes.PAUSE_PLAYER:
      return {
        ...state,
        playing: false
      }
    case actionTypes.REPLAY_PLAYER:
      return {
        ...state,
        position: 0,
        playing: true
      }
    case actionTypes.POSITION_CHANGE_PLAYER:
      return {
        ...state,
        position: action.position
      }
    case actionTypes.VOLUME_CHANGE_PLAYER:
      return {
        ...state,
        volume: action.volume
      }
    default:
      return state
  }
}