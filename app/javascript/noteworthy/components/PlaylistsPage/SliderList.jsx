import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Palette from 'react-palette'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import ReactResizeDetector from 'react-resize-detector'
import classNames from 'classnames'

import SliderPlaylistItem from './SliderPlaylistItem'
import SliderTrackItem from './SliderTrackItem'
import { playTrack } from '../../actions/songs'
import { pausePlayer, playPlayer } from '../../actions/player'
import { setActivePlaylist } from '../../actions/playlists'
import { resizeSlider, arrEqual } from '../../utils/helpers'

class SliderList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slidesToShow: props.slidesToShow,
      speed: props.speed || 200,
      settings: props.settings,
      sliderLoading: false,
      mode: props.mode || 'playlist' //'track' or 'playlist'
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.items != props.items) {
      this.setState({
        sliderLoading: true
      })
    }
  }

  componentDidUpdate() {
    if (this.state.sliderLoading) {
      this.setState({
        sliderLoading: false
      })
    }
  }

  handleClick = (item) => {
    if (this.state.mode == 'track') {
      this.selectTrack(item)
    } else {
      this.selectPlaylist(item)
    }
    
    if (this.props.onSelect) {
      this.props.onSelect(item)
    }
  }

  selectTrack = (track) => {
    if (track.id == this.props.currentTrack.id && this.props.playing) {
      this.props.pausePlayer()
    } else if (track.id == this.props.currentTrack.id && !this.props.playing) {
      this.props.playPlayer()
    } else {
      this.props.playTrack(track, this.props.items)
    }
  }

  selectPlaylist = (item) => {
    let { activePlaylist, activeHotPlaylist, tracksQueue } = this.props
    if (activeHotPlaylist.id == item.id || activePlaylist.id == item.id) {
      let playlistIds = item.songs.map(s => s['id'])
      let currentIds  = tracksQueue.map(s => s['id'])
      if (this.props.playing && arrEqual(playlistIds, currentIds)) { //pause player if current playlist is playing
        this.props.pausePlayer()
      } else {
        this.props.playTrack(item.songs[0], item.songs)
      }
    } else {
      this.props.setActivePlaylist(item)
    }
  }

  additionalAmount = () => {
    let { slidesToShow } = this.state
    let { items } = this.props
    if (items.length % slidesToShow == 0) {
      return 0
    } else {
      return slidesToShow - (items.length % slidesToShow)
    }
  }

  createItems = () => {
    let self = this,
        selectTrack = this.selectTrack,
        jsxItems = [],
        { slidesToShow, mode } = this.state,
        { items, currentTrack, activePlaylist, activeHotPlaylist } = this.props,
        SliderItem = mode == 'track' ? SliderTrackItem : SliderPlaylistItem,
        compareId = -1

    if (mode == 'track') {
      compareId = currentTrack && currentTrack.id
    } else if (items && items.length > 0 && items[0].type == 'Playlists::Hot') {
      compareId = activeHotPlaylist && activeHotPlaylist.id
    } else {
      compareId = activePlaylist && activePlaylist.id
    }

    items.forEach(function(item){
      let imageUrl = item.image ? item.image.url : '',
          itemClassNames = classNames(
            'playlistSliderItem',
            {'active': item.id == compareId},
            {'playing': self.props.playing && mode == 'track'}
          )

      jsxItems.push(self.composeSliderItem(item, itemClassNames, imageUrl, SliderItem))
    })

    return this.addAdditionalSlides(jsxItems, this.additionalAmount())
  }

  composeSliderItem = (item, itemClassNames, imageUrl, SliderItem) => {
    return (
      <div key={item.id} className={itemClassNames} onClick={(e) => this.handleClick(item)}>
        <Palette image={imageUrl} >
          {palette => <SliderItem item={item} palette={palette} />}
        </Palette>
      </div>
    )
  }

  addAdditionalSlides = (arr, amount) => {
    while(amount-- > 0) {
      arr.push(
        <div key={-1}>
        </div>
      )
    }
    return arr
  }

  render() {
    let { speed, slidesToShow, sliderLoading, settings } = this.state
    let defaultSettings = {
      centerPadding: '0px',
      centerMode: false,
      dots: false,
      variableWidth: false,
      infinite: false,
      speed: speed,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToShow,
      initialSlide: 0,
      className: 'playlists-slider clearfix',
      focusOnSelect: false,
      easing: 'easeOut'
    }

    let wrapperClassNames = classNames('slider-list-wrapper', {'loading': sliderLoading})

    return (
      <div className={wrapperClassNames}>
        <Slider {...(settings || defaultSettings)} ref="slider" >
          {this.createItems()}
        </Slider>
        <ReactResizeDetector handleWidth handleHeight onResize={resizeSlider} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTrack: state.songs.currentTrack,
    playing: state.player.playing,
    activePlaylist: state.playlists.activePlaylist,
    activeHotPlaylist: state.playlists.activeHotPlaylist,
    tracksQueue: state.tracksQueue.tracks
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    playTrack,
    pausePlayer,
    playPlayer,
    setActivePlaylist
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SliderList)
