const app = getApp(); // 获取实例
Page({
  data: {
    lanList: app.globalData.lanList, // 从全局获取所有的语言
    curLanIndex: app.globalData.curLan.index // 当前语言的索引
  },
  selectHandle(options) {
    const index = options.currentTarget.dataset.id;
    // 接下来需要修改全局的当前语言
    let {
      lanList
    } = app.globalData
    for (let i = 0; i < lanList.length; i++) {
      if (lanList[i].index === index) {
        app.globalData.curLan = lanList[i];
        // 再重新设置一下 curLanIndex
        this.setData({
          curLanIndex: app.globalData.curLan.index // 当前语言的索引
        })
      }
    }
  }
})