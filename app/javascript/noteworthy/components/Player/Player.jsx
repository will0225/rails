import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Wavesurfer from 'react-wavesurfer'
import Swipe from 'react-easy-swipe'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'
import { Link } from 'react-router'

import VolumeControl from './VolumeControl'
import MusicMenu from './MusicMenu'
import TrackInfoContent from '../Popups/TrackInfoContent'

import { secondsToTime, shuffleArray } from '../../utils/helpers'
import { playPlayer, pausePlayer, replayPlayer, positionChangePlayer } from '../../actions/player'
import { playTrack } from '../../actions/songs'

require('wavesurfer.js')

class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: 0,
      loading: false,
      currentTime: '00:00',
      totalTime: '00:00',
      shuffle: false
    };
  }

  handlePlay = () => {
    this.props.playPlayer()
  }

  handlePause = () => {
    this.props.pausePlayer()
  }

  togglePlay = () => {
    if (this.props.playing) {
      this.handlePause()
    } else {
      this.handlePlay()
    }
  }

  handleReplay = () => {
    this.setState({
      position: 0
    })
    this.refs.player._wavesurfer.play(0)
  }

  handlePosChange = (e) => {
    this.setState({
      position: e.originalArgs[0],
      currentTime: secondsToTime(e.originalArgs[0] || 0)
    });
  }

  seekBackward = () => {
    if (this.state.position >= 5) {
      this.refs.player._wavesurfer.play(this.state.position - 5)
    } else {
      this.refs.player._wavesurfer.play(0)
    }
  }

  seekForward = () => {
    if (this.props.currentTrack.audio && this.state.position < this.props.currentTrack.audio.duration - 6) {
      this.refs.player._wavesurfer.play(this.state.position + 5)
    } else {
      this.handleNext()
    }
  }

  handleReady = (e) => {
    this.setState({
      loading: false
    })
  }

  handleLoading = (e) => {
    this.setState({
      loading: true
    })
  }

  componentDidMount = () => {
    var self = this
    this.refs.player._wavesurfer.on('waveform-ready', function(e){
      self.handleReady({wavesurfer: self.refs.player._wavesurfer})
    })

    // if ('mediaSession' in navigator) {
    //   navigator.mediaSession.setActionHandler('play', this.handlePlay)
    //   navigator.mediaSession.setActionHandler('pause', this.handlePause)
    //   navigator.mediaSession.setActionHandler('seekbackward', this.seekBackward)
    //   navigator.mediaSession.setActionHandler('seekforward', this.seekForward)
    //   navigator.mediaSession.setActionHandler('previoustrack', this.handlePrev)
    //   navigator.mediaSession.setActionHandler('nexttrack', this.handleNext)
    // }
  }

  componentWillReceiveProps = (newProps) => {
    // this.updateMediaSession(newProps.currentTrack)
    // if (this.refs.player._wavesurfer.backend.media && this.refs.player._wavesurfer.backend.media.setAttribute) {
    //   this.refs.player._wavesurfer.backend.media.setAttribute('controls', true)
    //   this.refs.player._wavesurfer.backend.media.setAttribute('title', newProps.currentTrack.title)
    // }
  }

  updateMediaSession = (newData) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: newData.title,
        artist: newData.performer ? newData.performer[0].artist.name : '',
        artwork: [
          { src: newData.image.small ? newData.image.small.url : '',   sizes: '96x96',   type: 'image/png' },
          { src: newData.image.medium ? newData.image.medium.url : '', sizes: '128x128', type: 'image/png' },
          { src: newData.image.url ? newData.image.url : '', sizes: '256x256', type: 'image/png' }
        ]
      });
    }
  }

  handleNext = () => {
    this.handleTrackChange(this.findNextTrackId())
  }

  handlePrev = () => {
    this.handleTrackChange(this.findPrevTrackId())
  }

  handleMarkerClick = (e) => {
    this.setState({
      position: e.currentTarget.getAttribute('data-time')
    })
    this.refs.player._wavesurfer.play(e.currentTarget.getAttribute('data-time'))
  }

  handleTrackChange = (id) => {
    if (this.state.shuffle) {
      let randomTrackIndex = this.getRandomTrackIndex(-1)
      this.props.playTrack(this.props.tracksQueue.tracks[randomTrackIndex])
    } else {
      this.props.playTrack(this.props.tracksQueue.tracks[id])
    }
  }

  handleShuffle = () => {
    this.setState({
      shuffle: !this.state.shuffle
    })
  }

  getRandomTrackIndex = (previousAttempt) => {
    let randomId = Math.floor(Math.random() * this.props.tracksQueue.tracks.length)
    if (this.props.tracksQueue.tracks.length == 1) {
      return 0
    } else if (previousAttempt == randomId || this.props.tracksQueue.tracks[randomId].id == this.props.currentTrack.id) {
      return this.getRandomTrackIndex(randomId)
    } else {
      return randomId
    }
  }

  findNextTrackId = () => {
    const { tracksQueue, currentTrack } = this.props
    const currentTrackIndex = tracksQueue.tracks.map((track) => track.id).indexOf(currentTrack.id)

    if (currentTrackIndex + 1 != tracksQueue.tracks.length) {
      return currentTrackIndex + 1
    } else {
      return 0
    }
  }

  findPrevTrackId = () => {
    const { tracksQueue, currentTrack } = this.props
    const currentTrackIndex = tracksQueue.tracks.map((track) => track.id).indexOf(currentTrack.id)

    if (currentTrackIndex == 0) {
      return tracksQueue.tracks.length - 1
    } else {
      return currentTrackIndex - 1
    }
  }

  render() {
    const wavesurferOptions = {
      height: 42,
      barGap: 2,
      normalize: true,
      barWidth: 2,
      cursorColor: "#f8f8f8",
      hideScrollbar: true,
      loopSelection: false,
      progressColor: "#44b5e4",
      responsive: true,
      waveColor: "#969696",
      backend: 'MediaElement',

    }

    const { loading, shuffle, currentTime } = this.state
    const { currentTrack, trackFetching, playing, volume, activeVersion } = this.props
    let audio = currentTrack.audio

    const performer = currentTrack.participants.filter(participant => {
      return participant.role === 'performer'
    })

    let timeMarkerElements = []
    if (currentTrack.time_markers.length > 0) {
      timeMarkerElements = currentTrack.time_markers.map(marker => {
        let marginLeft = 100 * marker.time / audio.duration + '%'

        return (
          <div onClick={this.handleMarkerClick} data-time={marker.time} key={marker.id} style={{left: marginLeft}}>
            <span className="first-letter">{marker.name.charAt(0)}</span>
            <span className="full-name">{marker.name}</span>
          </div>
        )
      })
    }

    const duration = secondsToTime(audio.duration)

    let soundWaveClasses = classNames(
      'sound-wave',
      {fetching: trackFetching},
      {loading: loading}
    )

    let mobilePlayButtonClasses = classNames(
      'player-track-image-wrapper mobile', 
      {playing: playing}
    )

    return (
      <div id="player" className="player clearfix">
        <div className="player-wrapper">
          <div className="player-row">
            <div className="player-basic-track-info">
              <div>
                <div>
                  <div className="player-track-image">
                    <MediaQuery maxWidth={768} >
                      <div className={mobilePlayButtonClasses} onClick={this.togglePlay}>
                        <img src={currentTrack.image.url} alt=""/>
                      </div>
                    </MediaQuery>
                    <MediaQuery minWidth={768} >
                      <div className="player-track-image-wrapper">
                        <img src={currentTrack.image.small.url} alt=""/>
                      </div>
                    </MediaQuery>
                  </div>
                  <div className="player-basic-track-info-body">
                    <span>{currentTrack.title}</span><br/>
                    <Link to={"/artists/" + (performer[0] ? performer[0].artist.id : '')}>{performer[0] ? performer[0].artist.name : ''}</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="player-buttons">
              <button className={shuffle ? "button-shuffle active" : 'button-shuffle'} onClick={this.handleShuffle}></button>
              <button className="button-previous" onClick={this.seekBackward}></button>
              <button className={playing ? "button-play hidden" : "button-play"} onClick={this.handlePlay}></button>
              <button className={playing ? "button-pause" : "button-pause hidden"} onClick={this.handlePause} ></button>
              <button className="button-next" onClick={this.seekForward}></button>
              <button className="button-replay" onClick={this.handleReplay}></button>
            </div>

            <div className={soundWaveClasses}>
              <div className="current-time">
                {currentTime}
              </div>
              <div className="sound-wave-body">
                <div className='time-markers'>{timeMarkerElements}</div>
                <div className="waveform">
                  <Wavesurfer
                  ref="player"
                  audioPeaks={audio.waveform}
                  audioFile={audio.file.compressed_mp3.url}
                  playing={playing}
                  options={wavesurferOptions}
                  volume={this.props.volume}
                  onPosChange={this.handlePosChange}
                  onLoading={this.handleLoading}
                  onFinish={this.handleNext}
                  controls={true}
                  title={currentTrack.title}
                  />
                </div>
              </div>
              <div className="total-time">
                {duration}
              </div>
            </div>

            <VolumeControl />

            <MusicMenu currentTrack={currentTrack} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    playing: state.player.playing,
    volume: state.player.volume,
    currentTrack: state.songs.currentTrack,
    trackFetching: state.songs.trackFetching,
    tracksQueue: state.tracksQueue,
    activeVersion: state.songs.activeVersion
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    playPlayer,
    pausePlayer,
    replayPlayer,
    positionChangePlayer,
    playTrack
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Player)
