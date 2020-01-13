import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomScroll from 'react-custom-scroll'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'

import { closeModal } from '../../actions/modal'
import { createPlaylist } from '../../actions/playlists'

class CreatePlaylistPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropzoneActive: false,
      dropzoneSuccess: false,
      dropzoneFailure: false,
      playlistName: '',
      imageFile: undefined
    }
  }

  closePopup = () => {
    this.props.closeModal()
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

  handleSubmit = () => {
    this.props.createPlaylist(this.state.playlistName, this.state.imageFile, this.props.closeModal)
  }

  render() {
    let dropzoneClasses = classNames(
      'dropzone',
      'create-playlist-popup-dropzone',
      {'active': this.state.dropzoneActive},
      {'success': this.state.dropzoneSuccess},
      {'error': this.state.dropzoneFailure}
    )

    let loaderClasses = classNames(
      'lds-facebook',
      {'faded': !this.props.playlistCreating}
    )
    let createPlaylistButtonClasses = classNames(
      'playlists-popup-confirm',
      {'faded': this.props.playlistCreating}
    )
    let buttonDisabled = !this.state.imageFile || this.state.playlistName.trim().length == 0 || this.props.playlistCreating

    return (
      <div className="playlists-popup">
        <div className="playlists-popup-body">
          <div className="playlists-popup-tabs">
            <button className='create-playlist'>Create Playlist</button>
            <hr className="wide-line" />
          </div>
          <div className='playlists-popup-create-playlist active'>
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
          </div>
        </div>
        <div className="playlists-popup-buttons">
          <div className={loaderClasses}><div></div><div></div><div></div></div>
          <button disabled={buttonDisabled} className={createPlaylistButtonClasses} onClick={this.handleSubmit}>Create</button> or
          <button className="playlists-popup-close" onClick={this.closePopup}>Close</button>
        </div>
      </div>
    )
  }
}

function mapoStateToProps(state) {
  return {
    playlistCreating: state.playlists.playlistCreating
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    createPlaylist
  }, dispatch)
}

export default connect(mapoStateToProps, matchDispatchToProps)(CreatePlaylistPopup)
