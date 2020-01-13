import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import avatar from '../../images/avatar.png'

import { logoutUser } from '../../actions/auth'

class PersonalAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpened: false
    }
  }

  handeMenuToggle = () => {
    this.setState({
      menuOpened: !this.state.menuOpened
    })
  }

  handleLogout = () => {
    this.props.logoutUser()
    this.props.closeMenu()
  }

  render() {
    return(
      <div className="personal-account" onClick={this.handeMenuToggle}>
        <div>
          <div>
            <div className="account-page-link">
              {this.props.userData.username}
            </div>
            <div className="pic" style={{backgroundImage: `url(${this.props.userData.image.url})`}}>
            </div>
          </div>
        </div>
        <div className={this.state.menuOpened ? 'account-menu active' : 'account-menu'}>
          <Link onClick={this.props.closeMenu} to='/settings'>Settings</Link>
          <a onClick={this.handleLogout} >Sign out</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userData: state.currentUser.userData
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PersonalAccount)
