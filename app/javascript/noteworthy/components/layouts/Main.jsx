import React from 'react'
import CustomScroll from 'react-custom-scroll'

import Header from '../Header/Header'
import Player from '../Player/Player'
import BasePopup from '../Popups/BasePopup'

const Main = ({ children }) => (
  <div className="main-wrapper" >
    <Header />
    <div className="subheader-margin">
        <div className="content-wrapper">
          <div className="content">
            { children }
          </div>
        </div>
    </div>
    <Player />
    <BasePopup />
  </div>
)

export default Main
