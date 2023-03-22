const app = getApp();
Page({

  data: {
    historyList : app.globalData.history
  },

  onShow() {
    this.setData({
      historyList : app.globalData.history
    })
  },
  // 清除历史记录
  clearHistory(){
    // 1. 清除全局 history 的值，清除 historyList
    this.setData({
      historyList : ""
    });
    app.globalData.history = [];
    // 2. 清除本地缓存，下次进来的时候，历史记录也是空的
    wx.removeStorage({
      key: 'history',
      success(){
        console.log("本地缓存已清除")
      }
    })
  }
})