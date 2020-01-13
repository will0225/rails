import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwtDecode from 'jwt-decode'

import setAuthorizationToken from '../utils/setAuthorizationToken'
import { fetchCurrentUser, jwtDecodeCurrentUser } from '../actions/currentUser'
import { fetchDataForAuthenticated } from '../actions/auth'
import ErrorPopup from './Popups/ErrorPopup'

class App extends Component {

  componentWillMount() {
    const { jwtDecodeCurrentUser, fetchCurrentUser, fetchSearchFiltersData, fetchDataForAuthenticated } = this.props
    const access_token = localStorage.getItem('Access-Token')
    if (access_token && !(jwtDecode(access_token).exp < (Date.now() / 1000))) {
      setAuthorizationToken(access_token)
      jwtDecodeCurrentUser(jwtDecode(access_token))
      fetchCurrentUser()
      fetchDataForAuthenticated()
    }
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <ErrorPopup />
        { children }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.userData
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    jwtDecodeCurrentUser,
    fetchCurrentUser,
    fetchDataForAuthenticated
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
