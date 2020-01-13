import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routerActions } from 'react-router-redux'

import { loginUser } from '../actions/auth'
import logo from '../images/logo_login.png'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, replace, redirect } = nextProps
    const { isAuthenticated: wasAuthenticated } = this.props

    if (!wasAuthenticated && isAuthenticated) {
      replace(redirect)
    }
  }

  componentWillMount() {
    let query = this.props.location.query
    const { isAuthenticated, replace, redirect } = this.props
    if (isAuthenticated) {
      replace(redirect)
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.loginUser(this.state)
  }


  render() {
    let error = this.props.serverErrors && this.props.serverErrors.length > 0 ? 'Wrong username or password' : ''

    return (
      <div id="login-page">
        <div className="login-page-content">
          <div className="login-window-wrapper">
            <div className="login-window">
              <div className="login-logo">
                <img src={logo} alt=""/>
              </div>
              <div className="login-form">
                <form onSubmit={this.handleSubmit} >
                  <input
                    required
                    name="username"
                    type="text"
                    placeholder="Login"
                    value={this.state.username || ""}
                    onChange={this.handleInputChange} />
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password || ""}
                    onChange={this.handleInputChange} />
                  <input type="submit" hidden />
                </form>
                <div className="error">
                  {error}
                </div>
                <a href="" className="forgot-password hidden">Forgot password?</a>
                <div className="login-buttons">
                  <button className="login-button" onClick={this.handleSubmit}>Login</button>
                  <button className="sign-up-button hidden">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/hot" />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const isAuthenticated = state.auth.isAuthenticated || false
  const redirect = ownProps.location.query.redirect || '/hot'
  return {
    isAuthenticated,
    redirect,
    serverErrors: state.auth.errors
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser,
    push: routerActions.push,
    replace: routerActions.replace
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
