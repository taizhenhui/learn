import React, { Component } from 'react'
import Field from './component/Field'
export default class App extends Component {
  state = {
    username: 'admin',
    password: '123'
  }
  render() {
    let { username, password } = this.state
    return (
      <div>
        <h1>登录页面</h1>
        <Field label='用户名:' type='text' value={username}  onChangeEvent={(e) => {
          this.setState({
            username: e.target.value
          })
        }} />
        <Field label='密码:' type='password' value={password} onChangeEvent={(e) => {
          this.setState({
            password: e.target.value
          })
        }} />

        <button onClick={() => this.login()}>登录</button>
        <button onClick={() => this.reset()}>取消</button>
      </div>
    )
  }
  login = () => {
    const { username, password } = this.state
    console.log(username, password );
  }
  reset = () => {
    this.setState({
      username:'',
      password:''
    })
  }
}
