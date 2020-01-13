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
    const performers = this.props.item.participants.filter(participant => {
      return participant.role === 'performer'
    })

    const { props } = this
    const performerName = performers[0] ? performers[0].artist.name : '',
          image = props.item.image ? props.item.image.medium.url : '',
          id = props.item.id,
          title = props.item.title,
          palette = props.palette ? props.palette : {lightMuted: '#000'}

    let picClasses = classNames(
      'pic',
      {'loading': this.state.imageLoading}
    )

    return(
      <div>
        <div className={picClasses} >
          <div style={{boxShadow: '0 0 30px 3px' + palette.lightMuted, backgroundImage: `url(${image})`}}>
            <img src={image} alt="" onLoad={this.imageLoaded} />
          </div>
        </div>
        <div className="playlistSlideText">
          <div>
            <span>{title}</span>
            <span>{performerName}</span>
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