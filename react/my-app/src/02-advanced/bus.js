// 调度中心
var bus = {
  list: [],
  // 订阅
  subscribe(cb) {
    this.list.push(cb)
  },
  // 发布
  publish(text) {
    // 遍历所有的list， 将回调函数执行
    this.list.forEach((cb) => {
      cb && cb(text)
    })
  }
}



export default bus 
