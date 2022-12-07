import React, { Component } from 'react'
import Navbar from './Navbar'
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
