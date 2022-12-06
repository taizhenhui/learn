import React, { Component } from 'react'

export default class App extends Component {
  state = {
    text:'收藏',
    show: true
  }
  handleText = () => {
    this.setState({
      show: !this.state.show
    })
  }
  render() {
    
    return (
      <div>
        <button onClick={()=>this.handleText()}>{this.state.show ? '收藏':'取消'}</button>
      </div>
    )
  }
}
