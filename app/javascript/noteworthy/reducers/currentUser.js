import actionTypes from '../constants/actionTypes'

const initialState = {
  editUserIsFetching: false,
  userIsFetching: false,
  changePasswordIsFetching: false,
  userData: {
    image: {}
  }
}

export function userData (state = initialState.userData, action) {
  switch (action.type) {
    case actionTypes['FETCH_CURRENT_USER_SUCCESS']:
    case actionTypes['EDIT_CURRENT_USER_SUCCESS']:
    case actionTypes['SET_CURRENT_USER']:
      return {
        ...state,
        ...action.userData
      }
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER_REQUEST:
    case actionTypes.EDIT_CURRENT_USER_REQUEST:
      return {
        ...state,
        editUserIsFetching: action.editUserIsFetching,
        userIsFetching: action.userIsFetching,
      }
    case actionTypes.JWT_DECODE_CURRENT_USER:
    case actionTypes.SET_CURRENT_USER:
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
    case actionTypes.EDIT_CURRENT_USER_SUCCESS:
      return {
        ...state,
        editUserIsFetching: action.editUserIsFetching,
        userIsFetching: action.userIsFetching,
        userData: userData(state.userData, action),
        errors: ''
      }
    case actionTypes.FETCH_CURRENT_USER_FAILURE:
    case actionTypes.EDIT_CURRENT_USER_FAILURE:
      return {
        ...state,
        editUserIsFetching: action.editUserIsFetching,
        userIsFetching: action.userIsFetching,
        errors: action.errors
      }
    case actionTypes['CHANGE_PASSWORD_REQUEST']:
      return {
        ...state,
        changePasswordIsFetching: action.changePasswordIsFetching
      }
    case actionTypes['CHANGE_PASSWORD_SUCCESS']:
      return {
        ...state,
        changePasswordIsFetching: action.changePasswordIsFetching,
        message: action.message
      }
    case actionTypes['CHANGE_PASSWORD_FAILURE']:
      return {
        ...state,
        changePasswordIsFetching: action.changePasswordIsFetching,
        error: action.error
      }
    default:
      return state
  }
}
