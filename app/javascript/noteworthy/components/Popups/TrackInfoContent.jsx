import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import { secondsToTime, intersperse } from '../../utils/helpers'

export default class TrackInfoContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      versionsListActive: false
    }
  }

  toggleVersionsList = () => {
    if(this.props.trackFetching) return;

    this.setState({
      versionsListActive: !this.state.versionsListActive
    })
  }

  changeVersion = (e) => {
    let version = e.currentTarget.getAttribute('version')
    this.setState({
      versionsListActive: false
    })
    this.props.fetchTrack(this.props.currentTrack.versions.find(song => song.version == version).id)
  }

  render() {
    const { currentTrack } = this.props
    const songwriters = currentTrack.participants.filter(participant => {
      return participant.role === 'songwriter'
    })
    const producers = currentTrack.participants.filter(participant => {
      return participant.role === 'producer'
    })
    const additionalMusicians = currentTrack.participants.filter(participant => {
      return participant.role === 'additional_musician'
    })
    const performers = currentTrack.participants.filter(participant => {
      return participant.role === 'performer'
    })
    const publishers = currentTrack.participants.filter(participant => {
      return participant.role === 'publisher'
    })

    const songwritersElements = songwriters.map(participant => <Link key={participant.id} to={'/artists/' + participant.artist.id}>{participant.artist.name}</Link>)
    const producersElements = producers.map(participant => <Link key={participant.id} to={'/artists/' + participant.artist.id}>{participant.artist.name}</Link>)
    const additionalMusiciansElements = additionalMusicians.map(participant => <Link key={participant.id} to={'/artists/' + participant.artist.id}>{participant.artist.name}</Link>)
    const performersElements = performers.map(participant => <Link key={participant.id} to={'/artists/' + participant.artist.id}>{participant.artist.name}</Link>)
    const publishersElements = publishers.map(participant => <Link key={participant.id} to={'/artists/' + participant.artist.id}>{participant.artist.name}</Link>)

    const genres = currentTrack.genres.map(genre => genre.name)
    const moods = currentTrack.moods.map(mood => mood.name)
    const instruments = currentTrack.instruments.map(instrument => instrument.name)

    const duration = secondsToTime(currentTrack.audio.duration)

    const acapelloVersionClasses = classNames('active-song-version', {active: this.props.activeVersion == 'acapella'})
    const fullSongVersionClasses = classNames('active-song-version', {active: this.props.activeVersion == 'full'})
    const instrumentalVersionClasses = classNames('active-song-version', {active: this.props.activeVersion == 'instrumental'})

    const acapelloVersionButtonClasses = classNames(
      'song-versions-list-item',
      {hidden: !currentTrack.versions.find(song => song.version == 'acapella') || this.props.activeVersion == 'acapella'}
    )
    const instrumentalVersionButtonClasses = classNames(
      'song-versions-list-item',
      {hidden: !currentTrack.versions.find(song => song.version == 'instrumental') || this.props.activeVersion == 'instrumental'}
    )
    const fullSongVersionButtonClasses = classNames(
      'song-versions-list-item',
      {hidden: !currentTrack.versions.find(song => song.version == 'full') || this.props.activeVersion == 'full'}
    )
    const versionsListClasses = classNames(
      'song-versions-list',
      {active: this.state.versionsListActive}      
    )
    const versionsClasses = classNames(
      'track-info-song-version',
      {disabled: this.props.trackFetching}
    )

    return (
      <div>
        <div className="track-info-top">
          <div className="pic">
            <img src={currentTrack.image.medium.url} alt=""/>
          </div>
          <div className="track-info-top-text">
            <div className="text">
              {currentTrack.title}
            </div>
            {performersElements[0]}
            <span className="track-info-duration">{duration}</span>
          </div>
        </div>
        <div className={versionsClasses}>
          <div className={acapelloVersionClasses} onClick={this.toggleVersionsList}>
            <i className="active-song-version-icon acapello-icon"></i>
            <span>Acapello</span>
            <i className="icon-arr"></i>
          </div>
          <div className={instrumentalVersionClasses} onClick={this.toggleVersionsList}>
            <i className="active-song-version-icon instrumental-icon"></i>
            <span>Instrumental</span>
            <i className="icon-arr"></i>
          </div>
          <div className={fullSongVersionClasses} onClick={this.toggleVersionsList}>
            <i className="active-song-version-icon full-song-icon"></i>
            <span>Full Song</span>
            <i className="icon-arr"></i>
          </div>
          <div className={versionsListClasses}>
            <div version="instrumental" className={instrumentalVersionButtonClasses} onClick={this.changeVersion}>
              <i className="active-song-version-icon instrumental-icon"></i>
              <span>Instrumental</span>
            </div>
            <div version="full" className={fullSongVersionButtonClasses} onClick={this.changeVersion}>
              <i className="active-song-version-icon full-song-icon"></i>
              <span>Full Song</span>
            </div>
            <div version="acapella" className={acapelloVersionButtonClasses} onClick={this.changeVersion}>
              <i className="active-song-version-icon acapello-icon"></i>
              <span>Acapella</span>
            </div>
          </div>
        </div>
        <div className="track-info-data">
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <td>Download</td>
                  <td>
                    <a href={currentTrack.audio.download_mp3}>mp3</a>, <a href={currentTrack.audio.download_wav}>wav</a>
                  </td>
                </tr>
                <tr className={ currentTrack.bpm ? '' : 'hidden' }>
                  <td>Tempo</td>
                  <td>{currentTrack.bpm} bpm</td>
                </tr>
                <tr className={ genres.length == 0 ? 'hidden' : '' }>
                  <td>Genres</td>
                  <td>{genres.join(', ')}</td>
                </tr>
                <tr className={ moods.length == 0 ? 'hidden' : '' }>
                  <td>Moods</td>
                  <td>{moods.join(', ')}</td>
                </tr>
                <tr className={ instruments.length == 0 ? 'hidden' : '' }>
                  <td>Instruments</td>
                  <td>{instruments.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table">
            <table>
              <tbody>
                <tr className={ performers.length == 0 ? 'hidden' : '' }>
                  <td>Performer</td>
                  <td>
                    {performersElements[0]}
                  </td>
                </tr>
                <tr className={ songwriters.length == 0 ? 'hidden' : '' }>
                  <td>Songwriters</td>
                  <td>
                    {intersperse(songwritersElements, ', ')}
                  </td>
                </tr>
                <tr className={ producers.length == 0 ? 'hidden' : '' }>
                  <td>Producers</td>
                  <td>
                    {intersperse(producersElements, ', ')}
                  </td>
                </tr>
                <tr className={ additionalMusicians.length == 0 ? 'hidden' : '' }>
                  <td>Additional Musicians</td>
                  <td>
                    {intersperse(additionalMusiciansElements, ', ')}
                  </td>
                </tr>
                <tr className={ publishers.length == 0 ? 'hidden' : '' }>
                  <td>Publishers</td>
                  <td>
                    {intersperse(publishersElements, ', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
