// app.js
App({
  // 小程序启动，就会执行
  onLaunch(){
    wx.cloud.init({
      env: 'tai-5244-7gj4diwh4fc673d0' // 环境id
    })
  }
})
