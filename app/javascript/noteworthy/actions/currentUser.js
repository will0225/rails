import axios from 'axios'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import actionTypes from '../constants/actionTypes'
import { API_URL } from '../constants/api'

/*********** JWT_DECODE_CURRENT_USER **********/

export function jwtDecodeCurrentUser(userData) {
  return {
    type: actionTypes['JWT_DECODE_CURRENT_USER'],
    userIsFetching: false,
    userData
  }
}

/*********** SET_CURRENT_USER **********/

export function setCurrentUser(userData) {
  return {
    type: actionTypes['SET_CURRENT_USER'],
    userIsFetching: false,
    userData
  }
}

/************* FETCH_CURRENT_USER *************/

function requestFetchCurrentUser() {
  return {
    type: actionTypes['FETCH_CURRENT_USER_REQUEST'],
    userIsFetching: true
  }
}

function receiveFetchCurrentUser(userData) {
  return {
    type: actionTypes['FETCH_CURRENT_USER_SUCCESS'],
    userIsFetching: false,
    userData
  }
}

function errorFetchCurrentUser(errors) {
  return {
    type: actionTypes['FETCH_CURRENT_USER_FAILURE'],
    userIsFetching: false,
    errors
  }
}

export function fetchCurrentUser() {
  return async (dispatch, getState) => {
    dispatch(requestFetchCurrentUser())

    axios({
      method: 'get',
      url: API_URL + `/user`
    })
    .then(response => {
      dispatch(receiveFetchCurrentUser(response.data))
    })
    .catch(error => {
      console.log(error)
      error.response ? dispatch(errorFetchCurrentUser(error.response.data.message)) : dispatch(errorFetchCurrentUser("Unknown error"))
    })
  }
}

/*********** EDIT_CURRENT_USER **********/

function requestEditCurrentUser() {
  return {
    type: actionTypes.EDIT_CURRENT_USER_REQUEST,
    editUserIsFetching: true
  }
}

function receiveEditCurrentUser(userData) {
  return {
    type: actionTypes.EDIT_CURRENT_USER_SUCCESS,
    editUserIsFetching: false,
    userData
  }
}

// function errorEditCurrentUser(errors) {
//   return {
//     type: EDIT_CURRENT_USER_FAILURE,
//     editUserIsFetching: false,
//     errors
//   }
// }

export function editCurrentUser(userData, callback) {
  return async (dispatch, getState) => {
    dispatch(requestEditCurrentUser())

    var signupData = new FormData()
    userData.email && signupData.append("email", userData.email)
    userData.username && signupData.append("username", userData.username)
    userData.image && signupData.append("image", userData.image)
    typeof userData.public != 'undefined' && signupData.append("public", userData.public)

    var userId = getState().currentUser.userData.id
    axios({
      method: 'patch',
      url: API_URL + '/user.json',
      data: signupData
    })
    .then(response => {
      dispatch(receiveEditCurrentUser(response.data))
      if (typeof callback === "function") {
        callback()
        window.scrollTo(0, 0)
      }
    })
    .catch(error => {
      //error.response ? dispatch(errorEditCurrentUser(error.response.data.message)) : dispatch(errorEditCurrentUser("Unknown error"))
      console.log(error)
    })
  }
}

function requestChangePassword() {
  return {
    type: actionTypes.CHANGE_PASSWORD_REQUEST,
    changePasswordIsFetching: true
  }
}

function receiveChangePassword(message) {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    changePasswordIsFetching: false,
    message
  }
}

function errorChangePassword(errors) {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAILURE,
    changePasswordIsFetching: false,
    errors
  }
}

export function changePassword(passwords, callback) {
  return async (dispatch, getState) => {
    dispatch(requestChangePassword())

    axios({
      method: 'patch',
      url: API_URL + '/change_password',
      data: {
        ...passwords
      }
    })
    .then(response => {
      dispatch(receiveChangePassword(response.data.message))
      if (typeof callback === "function") {
        callback()
      }
    })
    .catch(error => {
      error.response ? dispatch(errorChangePassword(error.response.data.message)) : dispatch(errorChangePassword("Unknown error"))
    })
  }
}