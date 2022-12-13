import React, { Component } from 'react'


class Child extends Component {
  state = {
    title: '1'
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    // 最先获得父组件传来的属性，可以利用属性进行ajax或者逻辑处理。
    // 把属性转化成孩子自己的状态。
    this.setState({
      title: nextProps.name + '-tai'
    })
  }
  render() {
    console.log('Child-render');
    return (
      <div>{this.state.title}</div>
    )
  }
}


export default class App extends Component {
  state = {
    name: 'tai'
  }
  render() {
    return (

      <div>
        <button onClick={() => {
          this.setState({
            name: 'mou'
          })
        }}>{this.state.name}</button>
        {this.state.name}
        <Child name={this.state.name}/>
      </div>
    )
  }
}
