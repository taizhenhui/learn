import React, { Component } from 'react'

export default class Tick extends Component {
  constructor(props) {
    super(props)
    // 初始化状态
    this.state = {
      left: this.props.num,
    }
    this.timer = setInterval(() => {
      this.setState({
        left:  this.state.left -1,
      })
      if(this.state.left === 0){
        clearInterval(this.timer)
      }

    }, 1000)
  }

  render() {
    return <h1>倒计时剩余时间：{this.state.left}</h1>
  }
}
