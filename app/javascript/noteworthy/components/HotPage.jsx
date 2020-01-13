import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import CustomScroll from 'react-custom-scroll'
import classNames from 'classnames'

import SliderList from './PlaylistsPage/SliderList'
import MusicListHeader from './SearchPage/MusicListHeader'
import MusicListItems from './SearchPage/MusicListItems'
import { toHHMMSS } from '../utils/helpers'
import { copyPlaylist } from '../actions/playlists'

class HotPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollTo: undefined
    }
  }

  scrollToList = () => {
    const musicListHeaderNode = ReactDOM.findDOMNode(this.musicListHeaderRef)
    const positions = musicListHeaderNode.getBoundingClientRect()
    this.setState({
      scrollTo: positions.y
    })
  }

  handleScroll = () => {
    this.setState({
      scrollTo: undefined
    })
  }

  getMusicListHeaderRef = (element) => {
    this.musicListHeaderRef = element
  }

  getDurationTime = () => {
    let duration = this.props.activeHotPlaylist.duration
    if (duration) {
      return toHHMMSS(duration)
    } else {
      return '00:00:00'
    }
  }

  addToMyMusic = () => {
    let { activeHotPlaylist, copyPlaylist } = this.props
    copyPlaylist(activeHotPlaylist.id)
  }

  render() {
    return (
      <div className="hot-page-container">
        <CustomScroll onScroll={this.handleScroll} scrollTo={this.state.scrollTo} allowOuterScroll={false} heightRelativeToParent="100%">
          <div id="hot-page">
            <div className="hot-page-vertical-centered-wrapper">
              <div className="hot-page-vertical-centered">
                <div className="hot-page-content">
                  <div className="hot-page-wrapper">
                    <div className="background-inscription albums" >
                      Hottest Albums
                    </div>
                  </div>
                  <div className="hot-page-slider">
                    <MediaQuery maxWidth={400}>
                      <SliderList items={this.props.hotPlaylists} slidesToShow={1} speed={30} mode="playlist" onSelect={this.handleSelect} />
                    </MediaQuery>
                    <MediaQuery minWidth={401} maxWidth={500}>
                      <SliderList items={this.props.hotPlaylists} slidesToShow={2} speed={30} mode="playlist" onSelect={this.handleSelect} />
                    </MediaQuery>
                    <MediaQuery minWidth={501} maxWidth={642}>
                      <SliderList items={this.props.hotPlaylists} slidesToShow={3} mode="playlist" onSelect={this.handleSelect} />
                    </MediaQuery>
                    <MediaQuery minWidth={643} maxWidth={815}>
                      <SliderList items={this.props.hotPlaylists} slidesToShow={4} mode="playlist" onSelect={this.handleSelect} />
                    </MediaQuery>
                    <MediaQuery minWidth={816} maxWidth={946}>
                      <SliderList items={this.props.hotPlaylists} slidesToShow={5} mode="playlist" onSelect={this.handleSelect} />
                    </MediaQuery>
                    <MediaQuery minWidth={947}>
                      <SliderList items={this.props.hotPlaylists} slidesToShow={6} mode="playlist" onSelect={this.handleSelect} />
                    </MediaQuery>
                  </div>
                  <div className="hot-page-wrapper">
                    <div className="hot-page-bottom clearfix">
                      <div className="hot-page-info">
                        <button className="add-to-my-music" onClick={this.addToMyMusic}><span>Add to My Music</span></button>
                        Duration - { this.getDurationTime() }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MusicListHeader ref={(el) => this.getMusicListHeaderRef(el)} wrapperClass="playlists-page-wrapper" items={['Track', 'Artist', 'Producer', 'Additional Musicians', 'Songwriters', 'Version', 'Tempo', 'Duration']} />

            <div className="playlists-page-wrapper playlist-tracks">
              { this.props.activeHotPlaylist && <div className="music-list-items-wrapper">
                <MusicListItems buttons={['add-to-playlist', 'add-to-queue', 'remove-from-playlist']} tracks={this.props.activeHotPlaylist.songs} />
              </div> }
            </div>
          </div>
        </CustomScroll>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    hotPlaylists: state.playlists.hotPlaylists,
    activeHotPlaylist: state.playlists.activeHotPlaylist
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    copyPlaylist
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(HotPage)
