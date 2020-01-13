import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MusicMenuChoice from './MusicMenuChoice'
import SongQueuePopup from './SongQueuePopup'
import PlaylistsPopup from './PlaylistsPopup'
import TrackInfoPopup from './TrackInfoPopup'
import CreatePlaylistPopup from './CreatePlaylistPopup'
import RenamePlaylistPopup from './RenamePlaylistPopup'
import RemovePlaylistPopup from './RemovePlaylistPopup'

import { closeModal } from '../../actions/modal'

class BasePopup extends Component {
  constructor(props) {
    super(props)

    this.MODAL_COMPONENTS = {
      'MUSIC_MENU_CHOICE': MusicMenuChoice,
      'SONG_QUEUE_POPUP': SongQueuePopup,
      'PLAYLISTS_POPUP': PlaylistsPopup,
      'TRACK_INFO_POPUP': TrackInfoPopup,
      'CREATE_PLAYLIST_POPUP': CreatePlaylistPopup,
      'RENAME_PLAYLIST_POPUP': RenamePlaylistPopup,
      'REMOVE_PLAYLIST_POPUP': RemovePlaylistPopup
    }
  }

  handleBlur = (e) => {
    var currentTarget = e.currentTarget
    const { closeModal } = this.props

    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        closeModal()
      }
    }, 0)
  }

  componentDidUpdate = () => {
    this._element.focus()
  }

  render() {
    const { modal } = this.props
    const SpecificModal = this.MODAL_COMPONENTS[modal.modalType]

    return (
      <div tabIndex="1" ref={(node) => {this._element = node}} onBlur={this.handleBlur}>
        { modal.modalIsOpen ? <SpecificModal { ...modal.modalProps } /> : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(BasePopup)
