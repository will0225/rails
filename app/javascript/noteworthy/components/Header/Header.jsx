import React, { Component } from 'react'
import { Link } from 'react-router'

import logo from '../../images/logo.png'

import MainMenu from './MainMenu'
import PersonalAccount from './PersonalAccount'
import MusicListHeader from '../SearchPage/MusicListHeader'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: props.currentPage,
      mobileMenuActive: false
    }
  }

  toggleMobileMenu = () => {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive
    })
  }

  closeMobileMenu = () => {
    this.setState({
      mobileMenuActive: false
    })
  }

  render() {
    return(
      <header>
        <Link to='/hot' onClick={this.closeMobileMenu} className="logo">
          <div>
            <div>
              <img src={logo} alt=""/>
            </div>
          </div>
        </Link>
        <div className={this.state.mobileMenuActive ? 'header-body clearfix active' : 'header-body clearfix'}>
          <MainMenu closeMenu={this.closeMobileMenu} />
          <PersonalAccount closeMenu={this.closeMobileMenu} />
        </div>
        <button className="mobile-menu" onClick={this.toggleMobileMenu}></button>
      </header>
    )
  }
}

export default Header
