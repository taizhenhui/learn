import React, { Component } from 'react'

export default class App extends Component {
  state = {
    username: 'admin'
  }
  render() {
    let { username } = this.state
    return (
      <div>
        <h1>login</h1>
        <input type="text" value={username} onChange={(e)=>{
          this.setState({
            username:e.target.value
          })
        }}/>
        <button onClick={() => {
          console.log(username)

        }}>登录</button>
        <button onClick={() => {
         this.setState({
          username:''
        })
        }}>重置</button>
      </div>
    )
  }
}
