import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Checkbox, CheckboxGroup } from 'react-checkbox-group'

import {
  setSearchMinTempo,
  setSearchMaxTempo,
  setCurrentFiltersTagsAndSearch
} from '../../actions/search'

class SearchFilters extends Component {
  openFilter = (e) => {
    e.target.closest('.search-filter').classList.toggle("active")
  }

  setMinTempo = (e) => {
    this.props.setSearchMinTempo(e.target.value)
  }

  setMaxTempo = (e) => {
    this.props.setSearchMaxTempo(e.target.value)
  }

  checkboxCollection = (array = []) => {
    return array.map(element => {
      return (
        <div className="clearfix checkbox" key={element.id}>
          <label htmlFor={element.id + '_tag'}><Checkbox value={element.id} id={element.id + '_tag'} /> {element.name}</label>
        </div>
      )
    })
  }

  checkboxesChanged = (newValues, obj, name) => {
    this.props.setCurrentFiltersTagsAndSearch(newValues)
  }

  render() {
    const genres = this.checkboxCollection(this.props.searchFiltersData.genres)
    const moods = this.checkboxCollection(this.props.searchFiltersData.moods)
    const instruments = this.checkboxCollection(this.props.searchFiltersData.instruments)

    return(
      <div className="search-filters">
        <div className="search-filter">
          <div className="search-filter-title" onClick={this.openFilter}>
            Version <span></span>
          </div>
          <div className="search-filter-body">
            <div className="clearfix checkbox">
              <label htmlFor='full-song-filter-checkbox'><input type="checkbox" id='full-song-filter-checkbox' /> Full Song</label>
            </div>
            <div className="clearfix checkbox">
              <label htmlFor='acapella-filter-checkbox'><input type="checkbox" id='acapella-filter-checkbox' /> Acapella</label>
            </div>
            <div className="clearfix checkbox">
              <label htmlFor='instrumental-filter-checkbox'><input type="checkbox" id='instrumental-filter-checkbox' /> Instrumental</label>
            </div>
          </div>
        </div>

        <div className="search-filter">
          <div className="search-filter-title" onClick={this.openFilter}>
            Tempo <span></span>
          </div>
          <div className="search-filter-body">
            <div className="clearfix">
              <div className="pull-left">
                <label htmlFor="min-tempo">Min</label>
                <input id="min-tempo" type="number" min="50" max="200" defaultValue={this.props.minTempo} onChange={this.setMinTempo} />
              </div>
              <div className="pull-right">
                <label htmlFor="max-tempo">Max</label>
                <input id="max-tempo" type="number" min="50" max="200" defaultValue={this.props.maxTempo} onChange={this.setMaxTempo} />
              </div>
            </div>
          </div>
        </div>
        <CheckboxGroup checkboxDepth={5} name="tags_ids" value={this.props.currentFilters.tags_ids} onChange={this.checkboxesChanged}>
          <div className="search-filter">
            <div className="search-filter-title" onClick={this.openFilter}>
              Genres <span></span>
            </div>
            <div className="search-filter-body">
              {genres}
            </div>
          </div>

          <div className="search-filter">
            <div className="search-filter-title" onClick={this.openFilter}>
              Mood <span></span>
            </div>
            <div className="search-filter-body">
              {moods}
            </div>
          </div>

          <div className="search-filter">
            <div className="search-filter-title" onClick={this.openFilter}>
              Instruments <span></span>
            </div>
            <div className="search-filter-body">
              {instruments}
            </div>
          </div>
        </CheckboxGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    minTempo: state.search.currentFilters.min_tempo,
    maxTempo: state.search.currentFilters.max_tempo,
    searchFiltersData: state.search.searchFiltersData,
    currentFilters: state.search.currentFilters
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchMinTempo,
    setSearchMaxTempo,
    setCurrentFiltersTagsAndSearch
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchFilters)
