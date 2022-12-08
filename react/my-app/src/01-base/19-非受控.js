import React, { Component } from 'react'

export default class App extends Component {
  myValue = React.createRef()
  render() {
    return (
      <div>
        <h1>login</h1>
        <input type="text" defaultValue={'admin123'} ref={this.myValue} />
        <button onClick={ ()=>{
          console.log(this.myValue.current.value)
        }}>登录</button>
        <button onClick={ ()=>{
          this.myValue.current.value = ''
        }}>重置</button>
      </div>
    )
  }
}
