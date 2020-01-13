import actionTypes from '../constants/actionTypes'

const initialState = {
  showPopup: false,
  popupMessages: [],
  mode: 'error' //or 'message'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_POPUP:
      return {
        ...state,
        popupMessages: action.popupMessages,
        mode: action.mode,
        showPopup: true
      }
    case actionTypes.HIDE_POPUP:
      return {
        ...state,
        popupMessages: [],
        showPopup: false
      }
    default:
      return state
  }
}
