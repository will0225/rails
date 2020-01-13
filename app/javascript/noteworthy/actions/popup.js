import actionTypes from '../constants/actionTypes'

export function showTemporaryPopup(messages, mode, time) {
  return async (dispatch, getState) => {
    dispatch(showPopup(messages, mode))
    window.setTimeout(() => {
      dispatch(hidePopup())
    }, time || 3000)
  }
}

export function showPopup(messages, mode) {
  return {
    type: actionTypes.SHOW_POPUP,
    mode: mode,
    popupMessages: messages
  }
}

export function hidePopup() {
  return {
    type: actionTypes.HIDE_POPUP
  }
}