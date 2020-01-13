import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { closeModal } from '../../actions/modal'
import { removePlaylist, removeSharedPlaylist } from '../../actions/playlists'

class RemovePlaylistPopup extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closePopup = () => {
    this.props.closeModal()
  }

  handleSubmit() {
    let { modalProps, removeSharedPlaylist, removePlaylist, activePlaylist } = this.props
    
    if (modalProps.removeSharedPlaylist) {
      removeSharedPlaylist(activePlaylist.id)
    } else {
      removePlaylist(activePlaylist.id)
    }
  }

  render() {
    let loaderClasses = classNames(
      'lds-facebook remove',
      {'faded': !this.props.playlistRemoving}
    )
    let deletePlaylistButtonClasses = classNames(
      'pull-right playlists-popup-confirm',
      {'faded': this.props.playlistRemoving}
    )
    let buttonDisabled = this.props.playlistRemoving

    return (
      <div className="window-popup">
        <div onClick={this.closePopup} className="window-popup-background"></div>
        <div className="window-popup-body">
          <div className="window-popup-header">
            <h2>Remove the playlist?</h2>
          </div>
          <div className="window-popup-content">
            <div className="clearfix">
              <div className={loaderClasses}><div></div><div></div><div></div></div>
              <button onClick={this.closePopup} className='pull-right playlists-popup-close'>No</button>
              <button onClick={this.handleSubmit} disabled={buttonDisabled} className={deletePlaylistButtonClasses}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activePlaylist: state.playlists.activePlaylist,
    playlistRemoving: state.playlists.playlistRemoving,
    modalProps: state.modal.modalProps
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    removePlaylist,
    removeSharedPlaylist
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(RemovePlaylistPopup)
