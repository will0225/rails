import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomScroll from 'react-custom-scroll'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'

import { openModal, closeModal } from '../../actions/modal'
import { addToPlaylist, createPlaylist } from '../../actions/playlists'

class PlaylistsPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'add-to-playlist',
      dropzoneActive: false,
      dropzoneSuccess: false,
      dropzoneFailure: false,
      playlistName: '',
      imageFile: undefined,
      addingToPlaylistId: -1
    }
  }

  selectTab = (e) => {
    this.setState({
      activeTab: e.target.getAttribute('data-tab-name')
    })
  }

  closePopup = () => {
    this.props.closeModal()
  }

  addToPlaylist = (playlist) => {
    this.props.addToPlaylist(playlist.id, this.props.track.id)
    this.setState({
      addingToPlaylistId: playlist.id
    })
  }

  handleOnDrop = (acceptedFiles, rejectedFiles, e) => {
    if (acceptedFiles[0]) {
      this.setState({
        dropzoneActive: false,
        imageFile: acceptedFiles[0],
        dropzoneSuccess: true,
        dropzoneFailure: false
      })
    } else {
      this.setState({
        dropzoneActive: false,
        dropzoneSuccess: false,
        dropzoneFailure: true,
        imageFile: undefined,
      })
    }
  }

  handleDragEnter = (e) => {
    this.setState({
      dropzoneActive: true
    })
  }

  handleDragLeave = (e) => {
    this.setState({
      dropzoneActive: false
    })
  }

  handleNameChange = (e) => {
    this.setState({
      playlistName: e.target.value
    })
  }

  handleCreatePlaylist = () => {
    let self = this
    this.props.createPlaylist(this.state.playlistName, this.state.imageFile, () => {
      self._tabs.focus()
      self.setState({
        activeTab: 'add-to-playlist'
      })
    })
  }

  render() {
    const playlistsElements = this.props.playlists.slice().filter(playlist => {
      return playlist.user_id == this.props.currentUserId
    }).reverse().map(playlist => {
      let buttonClasses = classNames(
        'add-to-playlist',
        {'faded': this.state.addingToPlaylistId == playlist.id && this.props.addingToPlaylist}
      )
      let loaderClasses = classNames(
        'lds-facebook playlists',
        {'faded': this.state.addingToPlaylistId != playlist.id || !this.props.addingToPlaylist}
      )

      return (
        <div key={playlist.id} className="playlists-popup-playlist clearfix">
          <div className="pic">
            <img src={playlist.image.medium.url} alt=""/>
          </div>
          <div className="info">
            {playlist.title}
            <span>{playlist.songs.length} tracks</span>
          </div>
          <div className={loaderClasses}><div></div><div></div><div></div></div>
          <button disabled={this.props.addingToPlaylist} onClick={() => this.addToPlaylist(playlist)} className={buttonClasses}>
            +
          </button>
        </div>
      )
    })

    let dropzoneClasses = classNames(
      'dropzone',
      'create-playlist-popup-dropzone',
      {'active': this.state.dropzoneActive},
      {'success': this.state.dropzoneSuccess},
      {'error': this.state.dropzoneFailure}
    )

    let loaderClasses = classNames(
      'lds-facebook small',
      {'faded': !this.props.playlistCreating}
    )
    let createPlaylistButtonClasses = classNames(
      'create-playlist-form-button',
      {'faded': this.props.playlistCreating}
    )

    let buttonDisabled = !this.state.imageFile || this.state.playlistName.trim().length == 0 || this.props.playlistCreating

    return (
      <div className="playlists-popup">
        <div className="playlists-popup-body">
          <div tabIndex="1" ref={(node) => {this._tabs = node}} className="playlists-popup-tabs">
            <button className={this.state.activeTab == 'add-to-playlist' ? 'active' : ''} onClick={this.selectTab} data-tab-name="add-to-playlist">Add to Playlist</button>
            <button className={this.state.activeTab == 'create-playlist' ? 'active' : ''} onClick={this.selectTab} data-tab-name="create-playlist">Create Playlist</button>
            <hr className="hover-line" />
            <hr className="wide-line" />
          </div>
          <div className={this.state.activeTab == 'add-to-playlist' ? 'playlists-popup-list-wrapper active' : 'playlists-popup-list-wrapper'}>
            <CustomScroll heightRelativeToParent="100%">
              <div className="playlists-popup-list">
                {playlistsElements}
              </div>
            </CustomScroll>
          </div>
          <div className={this.state.activeTab == 'create-playlist' ? 'playlists-popup-create-playlist active' : 'playlists-popup-create-playlist'}>
            <div className="clearfix">
              <label htmlFor="">Playlist Name</label>
              <input type="text" onChange={this.handleNameChange} />
            </div>
            <div className="clearfix">
              <label htmlFor="">Playlist Image</label>
              <Dropzone ref={this._dropzone}
                        className={dropzoneClasses}
                        accept='image/*'
                        onDragEnter={this.handleDragEnter}
                        onDragLeave={this.handleDragLeave}
                        onDrop={this.handleOnDrop} >
                <div className="dropzone-content">
                  {this.state.imageFile ? this.state.imageFile.name : 'Upload image'}
                </div>
              </Dropzone>
            </div>
            <div className="clearfix">
              <button disabled={buttonDisabled} onClick={this.handleCreatePlaylist} className={createPlaylistButtonClasses}>
                Create a Playlist
              </button>
              <div className={loaderClasses}><div></div><div></div><div></div></div>
            </div>
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
    playlists: state.playlists.playlists,
    playlistCreating: state.playlists.playlistCreating,
    addingToPlaylist: state.playlists.addingToPlaylist,
    currentUserId: state.currentUser.userData.id
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    addToPlaylist,
    createPlaylist
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PlaylistsPopup)
