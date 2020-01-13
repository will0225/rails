import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MediaQuery from 'react-responsive'
import CustomScroll from 'react-custom-scroll'
import classNames from 'classnames'
import CopyToClipboard from 'react-copy-to-clipboard'

import SliderList from './PlaylistsPage/SliderList'
import MusicListHeader from './SearchPage/MusicListHeader'
import MusicListItems from './SearchPage/MusicListItems'
import { openModal, closeModal } from '../actions/modal'
import { getSharedPlaylist, setActivePlaylist } from '../actions/playlists'
import { push } from 'react-router-redux'

class PlaylistsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      copySuccess: false
    }
  }

  componentWillMount = () => {
    let { routeParams, setActivePlaylist, push } = this.props
    if (routeParams.token) {
      this.props.getSharedPlaylist(routeParams.token, (result) => {
        push('/playlists')
        if (result && result.id) {
          this.props.setActivePlaylist(result)
        }
      })
    }
  }

  handleCreatePlaylist = () => {
    this.props.openModal('CREATE_PLAYLIST_POPUP')
  }

  handleRenamePlaylist = () => {
    this.props.openModal('RENAME_PLAYLIST_POPUP')
  }

  handleRemovePlaylist = () => {
    let { openModal, currentUserId, activePlaylist } = this.props
    this.props.openModal('REMOVE_PLAYLIST_POPUP', {'removeSharedPlaylist': currentUserId != activePlaylist.user_id})
  }

  copyToClipboard = () => {
    this.setState({copySuccess: true})
    setTimeout(() => {
      this.setState({copySuccess: false})
    }, 2000);
  }

  render() {
    let items = this.props.playlists
    let copySuccessClasses = classNames('copy-success', {'hidden': !this.state.copySuccess})
    let renameButtonClasses = classNames('playlists-page-rename', {'hidden': this.props.currentUserId != this.props.activePlaylist.user_id})

    return (
      <CustomScroll allowOuterScroll={false} heightRelativeToParent="100%">
        <div id="playlists-page">
          <div className="playlists-list-block">
            <div className="playlists-page-wrapper">
              <div className="playlists-list-wrapper">
                <MediaQuery maxWidth={768} speed={30} >
                  <SliderList items={items} slidesToShow={1} mode="playlist" />
                </MediaQuery>
                <MediaQuery minWidth={768} maxWidth={781} orientation="landscape">
                  <SliderList items={items} slidesToShow={4} mode="playlist" />
                </MediaQuery>
                <MediaQuery minWidth={782} orientation="landscape">
                  <SliderList items={items} slidesToShow={5} mode="playlist" />
                </MediaQuery>
                <MediaQuery minWidth={768} maxWidth={1024} orientation="portrait" >
                  <SliderList items={items} slidesToShow={3} mode="playlist" />
                </MediaQuery>
                <MediaQuery minWidth={1024} orientation="portrait" >
                  <SliderList items={items} slidesToShow={4} mode="playlist" />
                </MediaQuery>
              </div>
            </div>
          </div>

          <div className="playlists-buttons">
            <div className="playlists-page-wrapper">
              <button onClick={this.handleCreatePlaylist} className="playlists-page-create">Create</button>
              <button onClick={this.handleRenamePlaylist} className={renameButtonClasses}>Rename</button>
              <div className="share-playlist">
                <CopyToClipboard text={document.location.origin + '/share/' + this.props.activePlaylist.token} onCopy={this.copyToClipboard}>
                  <button className="playlists-page-share">Share</button>
                </CopyToClipboard>
                <div className={copySuccessClasses}>
                  Link copied to clipboard
                </div>
              </div>
              <button onClick={this.handleRemovePlaylist} className="playlists-page-delete">Delete</button>
            </div>
          </div>

          <MusicListHeader wrapperClass="playlists-page-wrapper" items={['Track', 'Artist', 'Producer', 'Additional Musicians', 'Songwriters', 'Version', 'Tempo', 'Duration']} />

          <div className="playlists-page-wrapper playlist-tracks">
            { this.props.activePlaylist && <div className="music-list-items-wrapper">
              <MusicListItems buttons={['add-to-playlist', 'add-to-queue', 'remove-from-playlist']} tracks={this.props.activePlaylist.songs} />
            </div> }
          </div>
        </div>
      </CustomScroll>
    )
  }
}

function mapStateToProps(state) {
  return {
    playlists: state.playlists.playlists,
    activePlaylist: state.playlists.activePlaylist,
    currentUserId: state.currentUser.userData.id
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal,
    openModal,
    getSharedPlaylist,
    setActivePlaylist,
    push
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PlaylistsPage)
