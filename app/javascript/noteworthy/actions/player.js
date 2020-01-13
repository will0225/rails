import actionTypes from '../constants/actionTypes'

export function playPlayer() {
  return {
    type: actionTypes.PLAY_PLAYER
  }
}

export function pausePlayer() {
  return {
    type: actionTypes.PAUSE_PLAYER
  }
}

export function replayPlayer() {
  return {
    type: actionTypes.REPLAY_PLAYER
  }
}

export function positionChangePlayer(position) {
  return {
    type: actionTypes.POSITION_CHANGE_PLAYER,
    position
  }
}

export function volumeChangePlayer(volume) {
  return {
    type: actionTypes.VOLUME_CHANGE_PLAYER,
    volume
  }
}