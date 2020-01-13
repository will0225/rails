import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { openModal, closeModal } from '../../actions/modal'
import { removeFromPlaylist } from '../../actions/playlists'

class MusicMenuChoice extends Component {
  openPopup = (e) => {
    this.props.openModal(e.target.getAttribute('data-modal-type'), { track: this.props.track })
  }

  handleRemoveFromPlaylist = (e) => {
    this.props.removeFromPlaylist(this.props.activePlaylist.id, this.props.track.id)
  }

  render() {
    let additionalButtons = []
    if (this.props.additionalButtons) {
      this.props.additionalButtons.forEach(button => {
        switch (button) {
          case 'remove-from-playlist':
            return additionalButtons.push(<button key={1} onClick={(e) => this.handleRemoveFromPlaylist(e)} >Remove from Playlist</button>)
        }
      })
    }

    return (
      <div className='music-menu-choice active'>
        <button data-modal-type="PLAYLISTS_POPUP" onClick={this.openPopup}>Add to Playlist</button>
        <button data-modal-type="TRACK_INFO_POPUP" onClick={this.openPopup}>Song Versions and Info</button>
        <button data-modal-type="SONG_QUEUE_POPUP" onClick={this.openPopup}>Song Queue</button>
        { additionalButtons }
      </div>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openModal,
    closeModal,
    removeFromPlaylist
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    currentTrackId: state.modal.modalProps,
    activePlaylist: state.playlists.activePlaylist
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(MusicMenuChoice)
