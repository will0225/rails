import actionTypes from '../constants/actionTypes'

const initialState = {
  searchFiltersDataLoading: false,
  searchFiltersData: {
    genres: [
      {
        id: -1,
        name: ''
      }
    ],
    moods: [],
    instrumets: []
  },
  currentFilters: {
    title: '',
    min_tempo: 50,
    max_tempo: 200,
    tags_ids: []
  }
}

function currentFilters(state = initialState.currentFilters, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_TITLE:
      return {
        ...state,
        title: action.title
      }
    case actionTypes.SET_SEARCH_MIN_TEMPO:
      return {
        ...state,
        min_tempo: action.min_tempo
      }
    case actionTypes.SET_SEARCH_MAX_TEMPO:
      return {
        ...state,
        max_tempo: action.max_tempo
      }
    case actionTypes.SET_CURRENT_FILTERS_TAGS:
      return {
        ...state,
        tags_ids: action.tags_ids
      }
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SEARCH_FILTERS_DATA:
      return {
        ...state,
        searchFiltersDataLoading: true
      }
    case actionTypes.RECEIVE_SEARCH_FILTERS_DATA:
      return {
        ...state,
        searchFiltersData: action.searchFiltersData,
        searchFiltersDataLoading: false
      }
    case actionTypes.CHANGE_SEARCH_TITLE:
      return {
        ...state,
        currentFilters: currentFilters(state.currentFilters, action)
      }
    case actionTypes.SET_SEARCH_MIN_TEMPO:
      return {
        ...state,
        currentFilters: currentFilters(state.currentFilters, action)
      }
    case actionTypes.SET_SEARCH_MAX_TEMPO:
      return {
        ...state,
        currentFilters: currentFilters(state.currentFilters, action)
      }
    case actionTypes.SET_CURRENT_FILTERS_TAGS:
      return {
        ...state,
        currentFilters: currentFilters(state.currentFilters, action)
      }
    default:
      return state
  }
}
