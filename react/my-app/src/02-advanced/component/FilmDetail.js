import React, { Component } from 'react'
import '../css/filmDetail.css'
export default class FilmDetail extends Component {
  render() {
    const { info } = this.props
    return (
      <div className='container1'>
        <span>
          {info}
        </span>
      </div>
    )
  }
}
