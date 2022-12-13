import React, { Component } from 'react'

export default class App extends Component {
  state = {
    name:'tai'
  }
  // componentWillMount 初始化
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps',props, state)
    return {
      name: state.name
    }
  }
  render() {
    return (
      <div>
        <button onClick={()=>{
          this.setState({
            name:'mou'
          })
        }}>{this.state.name}</button>
        {this.state.name}
      </div>
    )
  }
}
