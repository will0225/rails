import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'
import CustomScroll from 'react-custom-scroll'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editCurrentUser, changePassword } from '../actions/currentUser'

class SettingsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: this.props.userData.username,
      email: '',
      password: '',
      passwordConfirm: '',
      oldPassword: '',
      passwordConfirmEdited: false,
      updatesSaved: false,
      passwordSaved: false,
      passwordsMatch: false
    }
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
      username: props.userData.username || this.state.username,
      email: props.userData.email || this.state.email
    })
  }

  handleChangePic = (e) => {
    this.props.editCurrentUser({image: e.target.files[0]})
  }

  handleSubmitUpdate = (e) => {
    e.preventDefault()
    let self = this

    this.props.editCurrentUser({
      username: this.state.username.length > 0 ? this.state.username : undefined,
      email: this.state.email.length > 0 ? this.state.email : undefined
    }, function() {
      self.setState({
        updatesSaved: true
      })
      setTimeout(() => {
        self.setState({
          updatesSaved: false
        })
      }, 3000)
    })
  }

  handleSubmitPassword = (e) => {
    e.preventDefault()
    let self = this
    if (this.state.password != this.state.passwordConfirm) {
      return
    }
    
    this.props.changePassword({
      old_password: this.state.oldPassword, 
      new_password: this.state.password
    }, () => {
      self.setState({
        passwordSaved: true
      })
      setTimeout(() => {
        self.setState({
          passwordSaved: false
        })
      }, 3000)
    })
  }

  handleChangeName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleChangePasswordConfirm = (e) => {
    this.setState({
      passwordConfirm: e.target.value
    })
  }

  handlePasswordConfirmEdited = (e) => {
    this.setState({
      passwordConfirmEdited: true
    })
  }

  handleChangeOldPassword = (e) => {
    this.setState({
      oldPassword: e.target.value
    })
  }

  render = () => {
    let { password, passwordConfirm, passwordConfirmEdited } = this.state
    let passwordChangeable = password.length > 0 && passwordConfirm.length > 0 && password == passwordConfirm
    let passwordError = !passwordChangeable && passwordConfirmEdited
    let passwrodConfirmClasssnames = classNames({'error': passwordError})
    let updatesSavedClassnames = classNames('user-update-success', {'hidden': !this.state.updatesSaved})
    let passwordSavedClassnames = classNames('password-update-success', {'hidden': !this.state.passwordSaved})

    return (
      <CustomScroll allowOuterScroll={false} heightRelativeToParent="100%">
        <div id="settings-page">
          <div className="settings-header">
            <div className="settings-header-wrapper">
              <div>
                <div>
                  <div className="pic" style={{backgroundImage: `url(${this.props.userData.image.url})`}}>
                  </div>
                  <input hidden id="upload-profile-pic" className="upload" onChange={this.handleChangePic} type="file"/>
                  <label htmlFor="upload-profile-pic" className="upload-label">Upload new picture</label>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-body">
            <div className="settings-form">
              <form onSubmit={this.handleSubmitUpdate}>
                <div className="form-line">
                  <div className="pull-left">
                    <label htmlFor="username-field">Username</label>
                    <input value={this.state.username} onChange={this.handleChangeName} type="text" id="username-field" />
                  </div>
                  <div className="pull-right">
                    <label htmlFor="email-field">Email</label>
                    <input value={this.state.email} onChange={this.handleChangeEmail} type="email" id="email-field" />
                  </div>
                </div>
                <div className="form-line">
                  <input type="submit" value="Update" className="submit" />
                  <span className={updatesSavedClassnames}>Saved!</span>
                </div>
              </form>
              <form onSubmit={this.handleSubmitPassword}>
                <div className="form-line">
                  <label htmlFor="old-password-field">Old password</label>
                  <input required onChange={this.handleChangeOldPassword} type="password" id="old-password-field" />
                </div>
                <div className="form-line">
                  <div className="pull-left">
                    <label htmlFor="password-field">New password</label>
                    <input required onChange={this.handleChangePassword} type="password" id="password-field" />
                  </div>
                  <div className="pull-right">
                    <label htmlFor="password-confirm-field">Confirm password</label>
                    <input required onBlur={this.handlePasswordConfirmEdited} onChange={this.handleChangePasswordConfirm} className={passwrodConfirmClasssnames} type="password" id="password-confirm-field" />
                  </div>
                </div>
                <div className="form-line">
                  <input type="submit" value="Change" className="submit" />
                  <span className={passwordSavedClassnames}>Changed!</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CustomScroll>
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
    editCurrentUser,
    changePassword
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsPage)