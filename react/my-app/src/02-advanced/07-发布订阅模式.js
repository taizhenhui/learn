import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}

// 调度中心
var bus = {
  list:[],
  // 订阅
  subscribe(cb) {
    this.list.push(cb)
  },
  // 发布
  publish(text) { 
    // 遍历所有的list， 将回调函数执行
    this.list.forEach((cb)=>{
      cb && cb(text)
    })
  }
}
bus.subscribe((value)=>{
  console.log('111',value);
})
bus.subscribe((value)=>{
  console.log('222',value);
})
console.log(bus);
setTimeout(()=>{
  bus.publish('asd')
},10)
setTimeout(()=>{
  bus.publish('森岛帆高')
},2000)