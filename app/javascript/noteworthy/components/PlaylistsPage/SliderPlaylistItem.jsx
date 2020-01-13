import React, { Component } from 'react'
import { resizeSlider } from '../../utils/helpers'
import classNames from 'classnames'

export default class SliderListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageLoading: true
    }
  }

  imageLoaded = (elem) => {
    this.setState({
      imageLoading: false
    })
  }

  render() {
    let { item, palette } = this.props
    let color = palette ? palette.lightMuted : '#000'
    let image = item.image ? item.image.medium.url : ''

    let picClasses = classNames(
      'pic',
      {'loading': this.state.imageLoading}
    )

    return(
      <div className="playlist-item">
        <div className={picClasses}>
          <div style={{boxShadow: '0 0 30px 3px' + color, backgroundImage: `url(${image})`}}>
            <img src={image} alt="" onLoad={this.imageLoaded} />
          </div>
        </div>
        <div className="playlistSlideText">
          <div>
            <span>{item.title}</span>
            <span>{item.songs.length + ' tracks'}</span>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    resizeSlider()
  }
  componentDidUpdate() {
    resizeSlider()
  }
}
