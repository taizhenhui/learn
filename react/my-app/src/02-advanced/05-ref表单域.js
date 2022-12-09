import React, { Component } from 'react'

class Field extends Component {
  state = {
    value: ''
  }
  clear = () => {
    this.setState({
      value: ''
    })
  }
  setValue = (value) => {
    this.setState({
      value
    })
  }
  render = () => {
    let { label, type } = this.props
    return (
      <div style={{ padding: '10px 0' }}>
        <label >{label}</label>
        <input type={type} value={this.state.value} onChange={(e) => {
          this.setState({
            value: e.target.value
          })
        }} />
      </div>
    )
  }
}

export default class App extends Component {
  myUname = React.createRef()
  myPwd = React.createRef()
  render() {

    return (
      <div>
        <h1>登录页面</h1>
        <Field ref={this.myUname} label='用户名:' type='text' value={'admin'} />
        <Field ref={this.myPwd} label='密码:' type='password' value={'123'} />

        <button onClick={() => this.login()}>登录</button>
        <button onClick={() => this.reset()}>取消</button>
      </div>
    )
  }
  login = () => {
    console.log(this.myUname.current.state.value, this.myPwd.current.state.value);
  }
  reset = () => {
    this.myUname.current.clear()
    this.myPwd.current.clear()
  }
}
