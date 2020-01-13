import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomScroll from 'react-custom-scroll'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'

import { closeModal } from '../../actions/modal'
import { renamePlaylist } from '../../actions/playlists'

class RenamePlaylistPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlistName: props.activePlaylist.title
    }
  }

  closePopup = () => {
    this.props.closeModal()
  }

  handleNameChange = (e) => {
    this.setState({
      playlistName: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.renamePlaylist(this.props.activePlaylist.id, this.state.playlistName)
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      playlistName: props.activePlaylist.title
    })
  }

  render() {
    let loaderClasses = classNames(
      'lds-facebook',
      {'faded': !this.props.playlistRenaming}
    )
    let renamePlaylistButtonClasses = classNames(
      'playlists-popup-confirm',
      {'faded': this.props.playlistRenaming}
    )
    let buttonDisabled = this.state.playlistName.trim().length == 0 || this.props.activePlaylist.title == this.state.playlistName.trim() || this.props.playlistRenaming

    return (
      <div className="playlists-popup">
        <div className="playlists-popup-body">
          <div className="playlists-popup-tabs">
            <button className='create-playlist'>Rename Playlist</button>
            <hr className="wide-line" />
          </div>
          <div className='playlists-popup-create-playlist active'>
            <div className="clearfix">
              <label htmlFor="">Playlist Name</label>
              <input type="text" value={this.state.playlistName} onChange={this.handleNameChange} />
            </div>
          </div>
        </div>
        <div className="playlists-popup-buttons">
          <div className={loaderClasses}><div></div><div></div><div></div></div>
          <button disabled={buttonDisabled} className={renamePlaylistButtonClasses} onClick={this.handleSubmit}>Rename</button> or
          <button className="playlists-popup-close" onClick={this.closePopup}>Close</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activePlaylist: state.playlists.activePlaylist,
    playlistRenaming: state.playlists.playlistRenaming
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    renamePlaylist
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(RenamePlaylistPopup)
