import React, { Component } from 'react'
import Palette from 'react-palette'

import MusicListItems from '../SearchPage/MusicListItems'

export default class AlbumsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      albums: props.albums || []
    }
  }

  render() {
    return (
      <div className="albums-list">
        {this.renderAlbums(this.state.albums)}
      </div>
    )
  }

  renderAlbums = (albums) => {
    return albums.map(function(album) {
      return (
        <div className="artist-page-album-block clearfix" key={album.id}>
          <div className="artist-page-album">
            <Palette image={album.image} >
              {
                palette => (
                  <button className="artist-page-album-play">
                    <img src={album.image} style={{boxShadow: '0 0 30px 3px' + palette.lightMuted}} alt=""/>
                  </button>
                )
              }
            </Palette>
          </div>
          <div className="artist-page-tracks">
            <div className="artist-page-tracks-header">
              {album.title}
            </div>
            <div className="artist-page-track-list">
              <MusicListItems tracks={album.tracks} />
            </div>
          </div>
        </div>
      )
    })
  }
}
