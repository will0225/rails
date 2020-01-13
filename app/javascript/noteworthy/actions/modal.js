import actionTypes from '../constants/actionTypes'

export function openModal(modalType, modalProps) {
  return {
    type: actionTypes.OPEN_MODAL,
    modalIsOpen: true,
    modalType: modalType,
    modalProps: modalProps
  }
}

export function showModal(modalType) {
  return {
    type: actionTypes.SHOW_MODAL,
    modalType: modalType
  }
}

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}