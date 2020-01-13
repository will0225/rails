import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { volumeChangePlayer } from '../../actions/player'

class VolumeControl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      previousVolume: 90,
      mute: false
    }
  }

  render() {
    return (
      <div className="volume-control">
        <button className="button-mute" onClick={this.handleMute}></button>
        <div className="volume-slider-wrapper">
          <Slider value={this.props.volume * 100} onChange={this.handleOnChange} step={10} />
        </div>
      </div>
    )
  }

  handleOnChange = (value) => {
    this.setState({
      mute: value == 0
    })
    this.props.volumeChangePlayer(value / 100)
  }

  handleMute = () => {
    if (this.state.mute) {
      this.setState({
        mute: false,
        previousVolume: 0
      })
      this.props.volumeChangePlayer(this.state.previousVolume / 100)
    } else {
      this.setState({
        mute: true,
        previousVolume: this.props.volume * 100
      })
      this.props.volumeChangePlayer(0)
    }
  }
}

function mapStateToProps(state) {
  return {
    volume: state.player.volume
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    volumeChangePlayer
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(VolumeControl)
