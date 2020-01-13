import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

class MessagesPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let elementClasses = classNames('errors-popup', 
      {'hidden': !this.props.showPopup}, 
      {'red': this.props.mode == 'error'},
      {'green': this.props.mode == 'message'})

    return (
      <div className={elementClasses} >
        {Array.isArray(this.props.messages) ? this.props.messages.join(', ') : this.props.messages}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    showPopup: state.popup.showPopup,
    messages: state.popup.popupMessages,
    mode: state.popup.mode
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MessagesPopup)
