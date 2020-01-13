import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomScroll from 'react-custom-scroll'
import MediaQuery from 'react-responsive'

import MusicListItems from './SearchPage/MusicListItems'
import SearchBar from './SearchSidebar/SearchBar'
import MusicListHeader from './SearchPage/MusicListHeader'
import { searchTracks } from '../actions/songs'

class SearchPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount = () => {
    this.props.searchTracks(this.props.songs.searchFilters)
  }

  loadNextPage = () => {
    this.props.searchTracks(this.props.songs.searchFilters, this.props.nextPage)
  }

  handleScroll = (e) => {
    if (this.props.tracksAreSearching || !this.props.nextPage) return

    let offsetHeight = e.target.querySelectorAll('.search-results')[0].offsetHeight
    let scroll = offsetHeight - e.target.scrollTop - 100
    if (scroll <= e.target.offsetHeight) {
      this.loadNextPage()
    }
  }

  render() {
    let { tracksAreSearching, pagination, songs } = this.props

    return(
      <div className="search">
        <CustomScroll className="search-custom-scroll" onScroll={this.handleScroll} allowOuterScroll={false} heightRelativeToParent="100%">
          <div className="music-list-header-wrapper">
            <MusicListHeader wrapperClass="content-container" items={['Track', 'Artist', 'Producer', 'Additional Musicians', 'Songwriters', 'Version', 'Tempo', 'Duration']} />
          </div>
          <SearchBar />
          <div className="search-results">
            <div className="content-container">
              <MusicListItems tracks={songs.searchResults} scrollableContainer='.search .custom-scroll .inner-container' tracksAreSearching={tracksAreSearching} pagination={pagination} loadNextPage={this.loadNextPage} />
            </div>
          </div>
        </CustomScroll>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    tracksAreSearching: state.songs.tracksAreSearching,
    pagination: state.songs.pagination,
    nextPage: state.songs.pagination.next_page
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    searchTracks
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchPage)
