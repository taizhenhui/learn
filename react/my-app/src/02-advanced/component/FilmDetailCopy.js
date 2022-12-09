import React, { Component } from 'react'
import '../css/filmDetail.css'
import bus from '../bus'
export default class FilmDetail extends Component {
  constructor() {
    super()

    this.state = {
      text: ''
    }
    // 订阅
    bus.subscribe((text) => {
      this.setState({
        text
      })
    })
  }
  render() {
    return (
      <div className='container1'>
        <span>
          {this.state.text}
        </span>
      </div>
    )
  }
}
