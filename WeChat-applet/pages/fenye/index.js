// pages/fenye/index.js
Page({
  data: {
    list: [],
    page: 0,
    pageSize: 20,
    dataTips: false
  },

  onLoad(options) {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh() {
    this.getList()
  },
  async getList() {
    let { list, page, pageSize } = this.data
    wx.showLoading({ title: '加载中...' })
    try {
      let res = await wx.cloud.callFunction({
        name:'getNumber',
        data:{
          page,
          pageSize
        }
      })
      let { data:dataList } = res.result.number
      // let res = await wx.cloud.database().collection('number').skip(page * pageSize).limit(pageSize).get()
      wx.stopPullDownRefresh()
      if (!dataList.length) {
        if (!this.data.dataTips) {
          wx.showToast({
            icon: 'none',
            title: '没有更多了',
          })
        }
        this.setData({
          dataTips: true
        })
        return
      }
      this.setData({
        list: [...list, ...dataList],
        dataTips: false
      })
    } catch (err) {
      console.log(err);
    } finally {
      wx.hideLoading()
    }
  },
  async onReachBottom() {
    let {
      page,
      dataTips
    } = this.data
    page++
    this.setData({
      page,
    })
    if (!dataTips) {
      this.getList()
    }
  }

})