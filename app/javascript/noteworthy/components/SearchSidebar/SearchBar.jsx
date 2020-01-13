import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MediaQuery from 'react-responsive'
import CustomScroll from 'react-custom-scroll'

import SearchFilters from './SearchFilters'
import { searchTracks } from '../../actions/songs'
import { changeSearchTitle } from '../../actions/search'

class SearchBar extends Component {

  handleSearch = (e) => {
    e.preventDefault()
    this.props.searchTracks(this.props.currentFilters)
  }

  textChange = (e) => {
    this.props.changeSearchTitle(e.target.value)
  }

  render() {
    return(
      <div className="search-bar">
        <form onSubmit={this.handleSearch} >
          <div className="search-input">
            <input type="text" value={this.props.currentFilters.text} onChange={this.textChange} />
            <button className="search-icon" onClick={this.handleSearch}></button>
          </div>
          <MediaQuery minWidth={768} >
            <div className="search-filters-scroll">
              <CustomScroll allowOuterScroll={false} heightRelativeToParent="100%" keepAtBottom={false} >
                <SearchFilters />
              </CustomScroll>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={768} >
            <SearchFilters />
          </MediaQuery>
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentFilters: state.search.currentFilters
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    searchTracks,
    changeSearchTitle
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchBar)
