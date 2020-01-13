import actionTypes from '../constants/actionTypes'
import axios from 'axios'
import { API_URL } from '../constants/api'

export function requestFetchArtist() {
  return {
    type: actionTypes.REQUEST_FETCH_ARTIST,
    artistFetching: true
  }
}

export function receiveFetchArtist(activeArtist) {
  return {
    type: actionTypes.RECEIVE_FETCH_ARTIST,
    artistFetching: false,
    activeArtist
  }
}

export function fetchArtist(artistId) {
  return async (dispatch, getState) => {
    dispatch(requestFetchArtist())

    axios({
      method: 'get',
      url: API_URL + '/artists/' + artistId
    })
    .then(data => {
      console.log(data.data)
      dispatch(receiveFetchArtist(data.data))
    })
    .catch(error => {
      console.log(error)
    })
  }
}