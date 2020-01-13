import React, { Component } from 'react'
import CustomScroll from 'react-custom-scroll'
import { Textfit } from 'react-textfit'
import MediaQuery from 'react-responsive'

export default class ArtistSidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bioCollapsed: true
    }
  }

  render() {
    return (
      <div className={this.state.bioCollapsed ? 'artist-sidebar collapsed' : 'artist-sidebar'}>
        <div className="artist-sidebar-header clearfix">
          <div className="artist-image">
            <div className="artist-image-background" style={{'backgroundImage': `url(${this.props.artist.image})`}}>
            </div>
          </div>
          <div className="artist-sidebar-name">
            <table>
              <tbody>
                <tr>
                  <td>
                    <span>
                      <Textfit>
                        {this.props.artist.name}
                      </Textfit>
                    </span>
                    <button onClick={this.props.playAll} className="artist-play-all">
                      Play All
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="artist-sidebar-body">
          <div className="artist-sidebar-body-wrapper-top">
            <div className="artist-sidebar-roles">
              {this.props.artist.roles.map((role, index) => <span key={index}>{role}</span>)}
            </div>
            <h2>Biography</h2>
          </div>
          <div className="artist-sidebar-bio">
            <div className="artist-sidebar-bio-shadow-top"></div>
              <MediaQuery minWidth={900} >
                <div className="artist-sidebar-bio-wrapper">
                  <CustomScroll allowOuterScroll={false} heightRelativeToParent={"100%"} >
                    <div dangerouslySetInnerHTML={{__html: this.props.artist.bio}} className="artist-sidebar-bio-content">
                    </div>
                  </CustomScroll>
                </div>
              </MediaQuery>
              <MediaQuery minWidth={768} maxWidth={900} >
                <div className="artist-sidebar-bio-wrapper">
                  <div dangerouslySetInnerHTML={{__html: this.props.artist.bio}} className="artist-sidebar-bio-content">
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={768} >
                <div className="artist-sidebar-bio-wrapper mobile">
                  <div dangerouslySetInnerHTML={{__html: this.props.artist.bio}} className="artist-sidebar-bio-content mobile">
                  </div>
                </div>
              </MediaQuery>
            <div className="artist-sidebar-bio-shadow-bottom"></div>
          </div>
        </div>
        <MediaQuery maxWidth={768} >
          <button className="artist-bio-collapse" onClick={this.collapseBio}>{this.state.bioCollapsed ? 'More' : 'Less'}</button>
        </MediaQuery>
      </div>
    )
  }

  collapseBio = () => {
    this.setState({
      bioCollapsed: !this.state.bioCollapsed
    })
    if(!this.state.bioCollapsed) {
      window.scrollTo(0, 0) //PEREDELAT
    }
  }
}