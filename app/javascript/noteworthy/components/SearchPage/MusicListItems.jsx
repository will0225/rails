import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MusicListItem from './MusicListItem'
import { playTrack } from '../../actions/songs'
import { pausePlayer, playPlayer } from '../../actions/player'
import { removeFromPlaylist } from '../../actions/playlists'
import { addToQueue } from '../../actions/tracksQueue'
import { openModal } from '../../actions/modal'

class MusicListItems extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpenedId: -1
    }

    this.handlePopup = this.handlePopup.bind(this)
  }

  componentDidMount() {
    document.addEventListener("click", this.documentClickHandler)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.documentClickHandler)
  }

  documentClickHandler = () => {
    this.setState({
      modalOpenedId: -1
    })
  }

  handlePopup(e, track) {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    let { tracks, openModal, buttons } = this.props
    if (tracks.length < 4 || track.id == tracks[tracks.length - 1].id || track.id == tracks[tracks.length - 2].id) {
      this.setState({
        modalOpenedId: -1 //close in-list modal
      })
      openModal('MUSIC_MENU_CHOICE', { track: track, additionalButtons: buttons })
    } else {
      this.setState({
        modalOpenedId: track.id == this.state.modalOpenedId ? -1 : track.id
      })
    }
  }

  render() {
    let tracks = this.props.tracks.map((track, index) =>
      <MusicListItem
        track={track}
        key={index}
        modalOpenedId={this.state.modalOpenedId}
        handlePopup={this.handlePopup}
        playPlayer={this.props.playPlayer}
        pausePlayer={this.props.pausePlayer}
        playTrack={this.props.playTrack}
        currentTrackId={this.props.currentTrackId}
        playing={this.props.playing}
        tracks={this.props.tracks}
        tracksQueue={this.props.tracksQueue}
        addToQueue={this.props.addToQueue}
        buttons={this.props.buttons}
        activePlaylist={this.props.activePlaylist}
        removeFromPlaylist={this.props.removeFromPlaylist}
        openModal={this.props.openModal}
        modal={this.props.modal} />
    )
    
    return(
      <div className="music-list-items">
        {tracks}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTrackId: state.songs.currentTrack.id,
    playing: state.player.playing,
    tracksQueue: state.tracksQueue,
    modal: state.modal,
    activePlaylist: state.playlists.activePlaylist,
    activeHotPlaylist: state.playlists.activeHotPlaylist
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    pausePlayer,
    playPlayer,
    playTrack,
    addToQueue,
    removeFromPlaylist,
    openModal
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MusicListItems)
