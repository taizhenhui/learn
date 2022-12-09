import React, { Component } from 'react'
import './style.css'
// import propTypes from "prop-types";
export default class Navbar extends Component {
  static defaultProps = {
    title: 'navber'
  }
  render() {
    let { current, title, goBack, goMine } = this.props
    return (
      <div className='navber_sty fl'>
        <div className='l_btn'>
          {
            current !== 0 && <span onClick={() => goBack()} >{'<'}</span>
          }
        </div>
        <p>{title}</p>
        <div className='r_btn'>
          {
            current !== 2 && <span onClick={() => goMine()}>我的</span>
          }
        </div>
      </div>
    )
  }
}
