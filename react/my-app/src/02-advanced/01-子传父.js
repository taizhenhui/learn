import React, { Component } from 'react'

class Navber extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.event()}>切换</button>
        <p>navber</p>
      </div>
    )
  }
}
class SideBar extends Component {
  render() {
    return (
      <div style={{ background: 'pink', width: '100px' }}>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
        <li>-1-1-</li>
      </div>
    )
  }
}

export default class App extends Component {
  state = {
    isShow: false
  }
  handleEvent = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  render() {
    return (
      <div>
        <Navber event={() => this.handleEvent()} />
        {this.state.isShow && <SideBar />}
      </div>
    )
  }
}
