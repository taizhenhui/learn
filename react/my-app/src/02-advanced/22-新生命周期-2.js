import React, { Component } from 'react'

export default class App extends Component {
  state = {
    text: '111'
  }
  render() {
    console.log('render')
    const { text } = this.state
    return (
      <div>
        <button onClick={() => {
          this.setState({
            text: '222'
          })
        }}>click</button>
        app - {text}
      </div>
    )
  }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }
  componentDidUpdate(prevProps, prevState, value) {
    console.log('componentDidUpdate', value);
  }
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
    return 100
  }
}
