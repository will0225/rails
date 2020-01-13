import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import { secondsToTime } from '../../utils/helpers'

export default class MusicListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      success: false
    }
  }

  setCurrentTrack = () => {
    this.props.playTrack(this.props.track, this.props.tracks)
  }

  setCurrentTrackWithVersion = (e) => {
    e.preventDefault()
    let version = e.currentTarget.getAttribute('version')
    this.setCurrentTrack()
    this.props.setActiveVersion(version)
  }

  pauseCurrentTrack = () => {
    this.props.pausePlayer()
  }

  resumeCurrentTrack = () => {
    this.props.playPlayer()
  }

  addToQueue = () => {
    if (this.props.tracksQueue.tracks.map(track => track.id).indexOf(this.props.track.id) == -1) {
      this.props.addToQueue(this.props.track)
    }
    this.setState({
      success: true
    })
    setTimeout(() => {this.setState({success: false})}, 1000)
  }

  handleAddToPlaylist = () => {
    this.props.openModal('PLAYLISTS_POPUP', { track: this.props.track })
  }

  handleRemoveFromPlaylist = () => {
    this.props.removeFromPlaylist(this.props.activePlaylist.id, this.props.track.id)
  }

  changeVersion = (e) => {
    let version = e.currentTarget.getAttribute('version')
    this.props.setActiveVersion(version)
  }

  buildParticipantsLinks = (participants) => {
    if (!participants || participants.length < 0) {
      return []
    } else {
      return participants.map((participant, index) => <Link to={"/artists/" + participant.artist.id} key={index}>{index == 0 ? '' : ', '}{participant.artist.name}</Link>)
    }
  }

  render() {
    const track = this.props.track

    let performers          = null
    let songWriters         = null
    let producers           = null
    let additionalMusicians = null
    let trackVersion        = null

    if (track.participants) {
      performers          = this.buildParticipantsLinks(track.participants.filter(participant => participant.role == "performer")) || []
      songWriters         = this.buildParticipantsLinks(track.participants.filter(participant => participant.role == "songwriter")) || []
      producers           = this.buildParticipantsLinks(track.participants.filter(participant => participant.role == "producer")) || []
      additionalMusicians = this.buildParticipantsLinks(track.participants.filter(participant => participant.role == "additional_musician")) || []
    }

    if (track.version == 'full') {
      trackVersion = <a title="Full song" version="full" className="table-icon full-song-icon"></a>
    } else if (track.version == 'instrumental') {
      trackVersion = <a title="Instrumental" version="instrumental" className="table-icon instrumental-icon"></a>
    } else if (track.version == 'acapella_audio') {
      trackVersion = <a title="Acapella" version="acapella" className="table-icon acapello-icon"></a>
    }

    let buttons = []
    if (this.props.buttons) {
      this.props.buttons.forEach(button => {
        switch (button) {
          case 'add-to-queue':
            return buttons.push(<button key={1} onClick={this.addToQueue}>Add to Queue</button>)
          case 'add-to-playlist':
            return buttons.push(<button key={2} onClick={this.handleAddToPlaylist}>Add to Playlist</button>)
          case 'remove-from-playlist':
            return buttons.push(<button key={3} onClick={this.handleRemoveFromPlaylist} >Remove from Playlist</button>)
        }
      })
    } else {
      buttons.push(<button key={1} onClick={this.addToQueue}>Add to Queue</button>)
      buttons.push(<button key={2} onClick={this.handleAddToPlaylist}>Add to Playlist</button>)
    }

    let { handlePopup, modalOpenedId } = this.props

    let musicListItemWrapperClasses = classNames("music-list-item-wrapper", {'success': this.state.success})
    let musicListItemClasses = classNames("music-list-item clearfix",
      {'current': this.props.currentTrackId == this.props.track.id},
      {'playing': this.props.playing})

    return(
      <div className={musicListItemWrapperClasses}>
        <div ref={(element) => this._element = element} className={musicListItemClasses}>
          <div className="image" >
            <div className="image-palceholder">
              { track.image && track.image.small && <img src={track.image.small.url} alt=""/> }
              <button className="play-track set" onClick={this.setCurrentTrack}></button>
              <button className="play-track pause" onClick={this.pauseCurrentTrack}></button>
              <button className="play-track resume" onClick={this.resumeCurrentTrack}></button>
            </div>
          </div>
          <div className="title">
            <div>
              <div>
                {track.title}
              </div>
            </div>
          </div>
          <div className={performers ? 'artist' : 'hidden'}>
            <div>
              <div>
                {performers}
              </div>
            </div>
          </div>
          <div className={producers ? 'producer' : 'hidden'}>
            <div>
              <div>
                {producers}
              </div>
            </div>
          </div>
          <div className={additionalMusicians ? 'additional-musician' : 'hidden'}>
            <div>
              <div>
                {additionalMusicians}
              </div>
            </div>
          </div>
          <div className={songWriters ? 'writer' : 'hidden'}>
            <div>
              <div>
                {songWriters}
              </div>
            </div>
          </div>
          <div className={trackVersion ? 'song-version' : 'hidden'}>
            {trackVersion}
          </div>
          <div className={track.bpm ? 'tempo' : 'hidden'}>
            {track.bpm}
          </div>
          <div className={track.audio ? 'duration' : 'hidden'}>
            {secondsToTime(track.audio && track.audio.duration)}
          </div>
          <div className="add-to-playlist">
            <button onClick={(e) => { handlePopup(e, track) }} className="add-to-playlist-button"></button>
          </div>
        </div>
        <div className={"music-menu-choice for-list" + ((modalOpenedId == track.id) ? ' active' : '')} >
          {buttons}
        </div>
      </div>
    )
  }
}
