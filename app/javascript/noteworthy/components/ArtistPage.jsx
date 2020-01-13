import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomScroll from 'react-custom-scroll'
import { playTrack } from '../actions/songs'
import { fetchArtist } from '../actions/artists'

import ArtistSidebar from './ArtistPage/ArtistSidebar'
import AlbumsList from './ArtistPage/AlbumsList'
import MusicListItems from './SearchPage/MusicListItems'
import MusicListHeader from './SearchPage/MusicListHeader'
import albumImage from '../images/test2.png'

class ArtistPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchArtist(this.props.routeParams.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.routeParams.id !== prevProps.routeParams.id) {
      this.props.fetchArtist(this.props.routeParams.id)
    }
  }

  playAll = () => {
    this.props.playTrack(this.props.activeArtist.songs[0], this.props.activeArtist.songs)
  }

  render() {
    let artist = {
      name: this.props.activeArtist.name,
      image: this.props.activeArtist.image.medium.url ? this.props.activeArtist.image.medium.url : this.props.activeArtist.image.url,
      roles: this.props.activeArtist.roles.map(role => role.charAt(0).toUpperCase() + role.slice(1)),
      bio: this.props.activeArtist.bio
    }

    return (
      <CustomScroll allowOuterScroll={false} heightRelativeToParent="calc(100vh - 62px - 62px)">
        <div id="artist-page" className="clearfix artist-page">
          <MusicListHeader wrapperClass="playlists-page-wrapper" items={[' ', 'Track', 'Artist', 'Producer', 'Version', 'Duration']} />
          <ArtistSidebar playAll={this.playAll} artist={artist} />
          <div className="artist-page-album-block no-albums clearfix">
            <div className="artist-page-album">
            </div>
            <div className="artist-page-tracks">
              <div className="artist-page-tracks-header">
              </div>
              <div className="artist-page-track-list">
                <MusicListItems buttons={['add-to-playlist', 'add-to-queue']} tracks={this.props.activeArtist.songs} />
              </div>
            </div>
          </div>
        </div>
      </CustomScroll>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeArtist: state.artists.activeArtist
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchArtist,
    playTrack
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ArtistPage)
