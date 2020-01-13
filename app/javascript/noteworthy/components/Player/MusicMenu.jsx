import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { openModal, closeModal } from '../../actions/modal'

class MusicMenu extends Component {
  constructor(props) {
    super(props)
  }

  toggleActive = () => {
    if (this.props.modalIsOpen) {
      this.props.closeModal()
    } else {
      this.props.openModal('MUSIC_MENU_CHOICE', { track: this.props.currentTrack })
    }
  }

  render() {
    return (
      <div className="music-menu">
        <button className="music-menu-button" onClick={this.toggleActive} ></button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modalIsOpen: state.modal.modalIsOpen,
    modalType: state.modal.modalType
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openModal,
    closeModal
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MusicMenu)
