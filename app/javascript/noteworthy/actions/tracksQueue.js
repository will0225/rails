import actionTypes from '../constants/actionTypes'

export function setTracksQueue(tracks) {
  return {
    type: actionTypes.SET_TRACKS_QUEUE,
    tracks
  }
}

export function addToQueue(track) {
  return {
    type: actionTypes.ADD_TO_QUEUE,
    track
  }
}

export function removeFromQueue(trackId) {
  return {
    type: actionTypes.REMOVE_FROM_QUEUE,
    trackId
  }
}