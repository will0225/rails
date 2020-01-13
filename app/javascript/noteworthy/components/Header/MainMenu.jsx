import React, { Component } from 'react'
import { Link } from 'react-router'

class MainMenu extends Component {

  render() {
    return(
      <div className="main-menu">
        <div>
          <div>
            <Link onClick={this.props.closeMenu} to="/playlists">My Music</Link>
            <Link onClick={this.props.closeMenu} to="/hot">Playlists</Link>
            <Link onClick={this.props.closeMenu} to="/search">Search</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default MainMenu
