import React, { Component } from 'react'

export default class MusicListHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: props.items || [],
      wrapperClass: props.wrapperClass || ''
    }
  }

  render() {
    const items = this.state.items.map((item) => {
        if (item == ' ') {
          return (<div className="music-list-header-item" key={item}>
            &nbsp; 
          </div>)
        } else {
          return (<div className="music-list-header-item" key={item}>
            {item}  
          </div>)
        }
      }
    )

    return(
      <div className="music-list-header">
        <div className={this.state.wrapperClass + ' clearfix'}>
          <div className="music-list-header-inner-wrapper">
            {items}
          </div>
        </div>
      </div>
    )
  }
}