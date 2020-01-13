import actionTypes from '../constants/actionTypes'
import { API_URL } from '../constants/api'
import { searchTracksByCurrentFilters } from './songs'
import axios from 'axios'

export function requestSearchFiltersData() {
  return {
    type: actionTypes.REQUEST_SEARCH_FILTERS_DATA
  }
}

export function fetchSearchFiltersData() {
  return async (dispatch, getState) => {
    dispatch(requestSearchFiltersData())

    axios({
      method: 'get',
      url: API_URL + '/search_filters.json'
    })
    .then(response => {
      dispatch(receiveSearchFiltersData(response.data))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function receiveSearchFiltersData(searchFiltersData) {
  return {
    type: actionTypes.RECEIVE_SEARCH_FILTERS_DATA,
    searchFiltersData
  }
}

export function changeSearchTitle(title) {
  return {
    type: actionTypes.CHANGE_SEARCH_TITLE,
    title
  }
}

export function setSearchMinTempo(min_tempo) {
  return {
    type: actionTypes.SET_SEARCH_MIN_TEMPO,
    min_tempo
  }
}

export function setSearchMaxTempo(max_tempo) {
  return {
    type: actionTypes.SET_SEARCH_MAX_TEMPO,
    max_tempo
  }
}

export function setCurrentFiltersTags(tagsIds) {
  return {
    type: actionTypes.SET_CURRENT_FILTERS_TAGS,
    tags_ids: tagsIds
  }
}

export function setCurrentFiltersTagsAndSearch(tagsIds) {
  return (dispatch, getState) => {
    dispatch(setCurrentFiltersTags(tagsIds))
    dispatch(searchTracksByCurrentFilters())
  }
}