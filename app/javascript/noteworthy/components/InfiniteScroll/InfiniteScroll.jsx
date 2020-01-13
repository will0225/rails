import React, { Component } from 'react'

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount = () => {
    this.props.searchTracks(this.props.songs.searchFilters)
  }

  render() {
    let { tracksAreSearching, pagination, songs } = this.props

    return(
      <div className="infinite-scroll">
        {this.props.children}
      </div>
    )
  }
}
