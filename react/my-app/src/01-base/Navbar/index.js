import React, { Component } from 'react'
import taiProp from 'prop-types'
import './index.css'

console.log(taiProp,'taiProp');
export default class Navbar extends Component {
  // 属性校验
  static propTypes = {
    title: taiProp.string,
    leftshow: taiProp.bool,
    rightshow: taiProp.bool
  }
  // 默认属性
  static defaultProps = {
    title: '首页',
    leftshow: true,
    rightshow: false
  }
  render() {
    const { title, leftshow, rightshow } = this.props
    return (
      <div>
        <div className='nav'>
          <span >{leftshow && '<'}</span>
          <p>{title}</p>
          <span>{rightshow && '='}</span>
        </div>
      </div>
    )
  }
}

// 类属性
