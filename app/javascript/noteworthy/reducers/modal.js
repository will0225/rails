import actionTypes from '../constants/actionTypes'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
  modalIsOpen: false,
  modalType: null,
  modalProps: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
        modalIsOpen: true
      }
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalIsOpen: true
      }
    case actionTypes.CLOSE_MODAL:
      return initialState
    case LOCATION_CHANGE:
      return {
        ...state,
        modalIsOpen: false
      }
    default:
      return state
  }
}
