import React, { Component } from 'react'

class Navber extends Component {
  render() {
    return (
      <div>
        {this.props.children}
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
  render() {
    return (
      <div>
        <Navber>
          <button onClick={()=>this.handleClick()}>切换</button>
        </Navber>
        {this.state.isShow && <SideBar />}
      </div>
    )
  }
  handleClick=() => {
    this.setState({
      isShow:!this.state.isShow
    })
  }
}