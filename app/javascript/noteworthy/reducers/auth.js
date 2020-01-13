import actionTypes from '../constants/actionTypes'
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  errors: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.JWT_DECODE_CURRENT_USER:
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.userData),
        isFetching: false
      }
    case actionTypes.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errors: ''
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errors: action.loginErrors
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      }
    default:
      return state
  }
}
