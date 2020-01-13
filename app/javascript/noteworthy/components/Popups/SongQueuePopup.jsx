import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CustomScroll from 'react-custom-scroll'
import classNames from 'classnames'

import { closeModal, openModal } from '../../actions/modal'
import { playTrack } from '../../actions/songs'
import { pausePlayer, playPlayer } from '../../actions/player'
import { removeFromQueue } from '../../actions/tracksQueue'

class SongQueuePopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpenedId: -1
    }
  }

  closePopup = () => {
    this.props.closeModal()
  }

  setCurrentTrack = (track) => {
    this.props.pausePlayer()
    this.props.playTrack(track)
  }

  pauseCurrentTrack = () => {
    this.props.pausePlayer()
  }

  resumeCurrentTrack = () => {
    this.props.playPlayer()
  }

  handleOpenMenu = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    if (e.currentTarget.getAttribute('data-id') == this.state.modalOpenedId) {
      this.setState({
        modalOpenedId: -1
      })
    } else {
      this.setState({
        modalOpenedId: e.currentTarget.getAttribute('data-id')
      })
    }
  }

  handleAddToPlaylist = (track) => {
    this.props.openModal('PLAYLISTS_POPUP', { track: track })
  }

  handleRemoveFromQueue = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    this.props.removeFromQueue(this.state.modalOpenedId)
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

  render () {
    const queue = this.props.tracks.map((track, index) => {
      let popupClassnames = classNames(
        'playlists-popup-playlist clearfix',
        {'active': track.id == this.props.currentTrackId},
        {'playing': this.props.playing},
        {'last': index == this.props.tracks.length - 1 && this.props.tracks.length != 1}
      )
      let menuChoiceClassnames = classNames(
        'music-menu-choice for-popup',
        {'active': this.state.modalOpenedId == track.id}
      )
      
      return (
        <div className={popupClassnames} key={track.id} data-id={track.id} >
          <div className="pic">
            <img src={track.image.small.url} alt=""/>
              <div className="play set" onClick={(e) => this.setCurrentTrack(track)}></div>
              <div className="play pause" onClick={this.pauseCurrentTrack}></div>
              <div className="play resume" onClick={this.resumeCurrentTrack}></div>
          </div>
          <div className="info">
            <div>
              <div>
                {track.title}
              </div>
            </div>
          </div>
          <button data-id={track.id} onClick={this.handleOpenMenu} className="song-queue-options">
            ...
          </button>
          <div className={menuChoiceClassnames}>
            <button onClick={e => this.handleAddToPlaylist(track)}>Add to Playlist</button>
            <button onClick={this.handleRemoveFromQueue}>Remove from Queue</button>
          </div>
        </div>
      )
    })

    return (
      <div className="playlists-popup song-queue">
        <div className="playlists-popup-body">
          <div className="playlists-popup-tabs">
            <button className="">Song Queue</button>
            <hr className="wide-line" />
          </div>
          <div className='playlists-popup-list-wrapper active'>
            <CustomScroll heightRelativeToParent="100%">
              <div className="playlists-popup-list">
                {queue}
              </div>
            </CustomScroll>
          </div>
        </div>
        <div className="playlists-popup-buttons">
          <button className="playlists-popup-close pull-right" onClick={this.closePopup} >Close</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.tracksQueue.tracks,
    currentTrackId: state.songs.currentTrack.id,
    playing: state.player.playing
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    playPlayer,
    pausePlayer,
    playTrack,
    openModal,
    removeFromQueue
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SongQueuePopup)
