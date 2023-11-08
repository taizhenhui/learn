import React, { Component } from 'react'
import '../style/Ball.css'
/**
 * 一个能够自动移动的小球
 */
export default class Ball extends Component {
  //属性中需要分别传递横纵坐标上的速度，每秒移动的像素值
  //props.xSpeed,  props.ySpeed
  //需要传递背景颜色，如果没有传递，则使用红色
  state = {
    left: this.props.left || 0,
    top: this.props.top || 0,
    xSpeed: this.props.xSpeed,
    ySpeed: this.props.ySpeed,
  }
  constructor(props) {
    super(props)
    const duration = 16
    setInterval(() => {
      // 根据速度，改变left和top值
      const xDis = (this.state.xSpeed * duration) / 1000
      const yDis = (this.state.ySpeed * duration) / 1000

      let newLeft = this.state.left + xDis
      let newTop = this.state.top + yDis

      if (newLeft <= 0) {
        newLeft = 0
        this.setState({
          xSpeed: -this.state.xSpeed,
        })
      } else if (newLeft >= document.documentElement.clientWidth - 50) {
        newLeft = document.documentElement.clientWidth - 50
        this.setState({
          xSpeed: -this.state.xSpeed,
        })
      }
      if (newTop <= 0) {
        newTop = 0
        this.setState({
          ySpeed: -this.state.ySpeed,
        })
      } else if (newTop >= document.documentElement.clientHeight - 50) {
        newTop = document.documentElement.clientHeight - 50
        this.setState({
          ySpeed: -this.state.ySpeed,
        })
      }
      this.setState({
        left:newLeft,
        top:newTop
      })
    }, duration)
  }
  render() {
    const { left, top } = this.state
    const { bg } = this.props

    return (
      <div
        className="ball"
        style={{
          left: left,
          top: top,
          backgroundColor: bg || '#f40',
        }}
      ></div>
    )
  }
}
