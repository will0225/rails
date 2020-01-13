import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomScroll from 'react-custom-scroll'
import MediaQuery from 'react-responsive'

import TrackInfoContent from './TrackInfoContent'
import { closeModal } from '../../actions/modal'
import { fetchTrack } from '../../actions/songs'

class TrackInfoPopup extends Component {
  constructor(props) {
    super(props)
  }

  closePopup = () => {
    this.props.closeModal()
  }

  render() {
    return (
      <div className="track-info-popup active">
        <MediaQuery maxWidth={768}>
          <CustomScroll allowOuterScroll={false} heightRelativeToParent="100%">
            <button className="close" onClick={this.closePopup}></button>
            <TrackInfoContent activeVersion={this.props.activeVersion} trackFetching={this.props.trackFetching} fetchTrack={this.props.fetchTrack} currentTrack={this.props.currentTrack} />
          </CustomScroll>
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <TrackInfoContent activeVersion={this.props.activeVersion} trackFetching={this.props.trackFetching} fetchTrack={this.props.fetchTrack} currentTrack={this.props.currentTrack} />
        </MediaQuery>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTrack: state.songs.currentTrack,
    activeVersion: state.songs.currentTrack.version,
    trackFetching: state.songs.trackFetching
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    fetchTrack
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TrackInfoPopup)
