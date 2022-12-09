# React - 组件通讯





###  父子组件通信方式

传递数据(父传子)与传递方法(子传父)

##### 父传子 

> 父组件通过 属性 向 子组件 传递数据

```react
import React, { Component } from 'react'
// 子组件 通过 props 接收 父组件 传来的数据
class Navbar extends Component {
  render() {
    const { title, leftshow, rightshow } = this.props
    return (
      <div>
        <div className='nav'>
          <span >{leftshow && '<'}</span>
          <p>{title}</p>
          <span>{rightshow && '='}</span>
        </div>
      </div>
    )
  }
}
// 父组件 
export default class App extends Component {
  render() {

    var obj = {
      title:"测试",
      leftshow:false,
      rightshow:true,
    }
    return (
      <div>
        <div>
          <h2>首页</h2>
          <Navbar  leftshow={false} rightshow={true} />
        </div>
        <div>
          <h2>列表</h2>
          <Navbar title='列表'  rightshow={true}/>
        </div>
        <div>
          <h2>我的</h2>
          <Navbar title='我的' />
        </div>
        <Navbar {...obj} />
      </div>
    )
  }
}
```



##### 子传父

> 父组件通过 属性 给子组件传递方法 ，子组件通过 触发 传过来的该方法 向父组件传递数据（该方法携带回来的参数）

```react
import React, { Component } from 'react'

// 子组件
class Field extends Component {
  render() {
    let { label, type, onChangeEvent, value } = this.props
    return (
      <div style={{ padding: '10px 0' }}>
        <label >{label}</label>
        <input type={type} onChange={(e) => onChangeEvent(e)} value={value} />
      </div>
    )
  }
}

// 父组件
export default class App extends Component {
  state = {
    username: 'admin'
  }
  render() {
    let { username } = this.state
    return (
      <div>
        <h1>登录页面</h1>
        <Field label='用户名:' type='text' value={username}  onChangeEvent={(e) => {
          this.setState({
            username: e.target.value
          })
        }} />
      </div>
    )
  }
}
```

##### ref标记

>  ref标记(父组件拿到子组件的引用，从而调用子组件的方法)

```react
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
  render() {
    return (
      <div>
        <h1>登录页面</h1>
        <Field ref={this.myUname} label='用户名:' type='text' value={'admin'} />

        <button onClick={() => this.login()}>登录</button>
        <button onClick={() => this.reset()}>取消</button>
      </div>
    )
  }
  login = () => {
    console.log(this.myUname.current.state.value);
  }
  reset = () => {
    this.myUname.current.clear()  // 父组件拿到子组件的引用，从而调用子组件的方法
  }
}
```



###  非父子组件通信方式



##### 状态提升(中间人模式)



##### 发布订阅模式实现



##### context状态树传参











