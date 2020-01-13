import React, { Component } from 'react'

class SearchInput extends Component {

  render() {
    return(
      <div className="search-input">
        <input type="text"/>
        <input type="submit" hidden />
        <button className="search-icon"></button>
      </div>
    )
  }
}

export default SearchInput
