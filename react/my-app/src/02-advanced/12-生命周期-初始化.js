import React, { Component } from 'react'

export default class App extends Component {
  state = {
    name: 'xiaoming'
  }
  // UNSAFE_componentWillMount() {
  //   // 第一次 挂载前 最后一次修改状态的机会
  //   console.log('componentWillMount');
  //   this.setState({
  //     name:'xiaohong'
  //   })
  //   // 初始化数据的作用。

  // }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    return {}
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true
  }
  getSnapshotBeforeUpdate(){
    console.log('getSnapshotBeforeUpdate');
    return {}
  }
  componentDidUpdate(prevProps, prevState) { 
    console.log('componentDidUpdate')
  } 
  // componentDidMount() {
  //   console.log('componentDidMount')
  //   // 数据请求
  //   // 订阅函数调用
  //   // setInterval
  //   // 基于创建完的dom进行 -- 初始化
  // }
  render() {
    console.log('render');
    return (
      <div>
        <button onClick={() => {
          this.setState({
            name: 'mou'
          })
        }}>click</button>
        {this.state.name}
      </div>
    )
  }
}
