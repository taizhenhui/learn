// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfo({
      success: res => {
        console.log('res',res);
      this.globalData.height = res.statusBarHeight
      }
     })
  },

  globalData: {
    userInfo: null,
    height: 0,
  }
})
