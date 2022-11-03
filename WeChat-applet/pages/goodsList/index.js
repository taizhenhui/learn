Page({
  data: {
    list: [],
    name: '',
    price: ''

  },
  onLoad() {
    this.getList()
  },
  getList() {
    const db = wx.cloud.database()
    db.collection('goods').get()
      .then(res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      })
  },
  go(e) {
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: `/pages/goodDetail/index?id=${id}`,
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
    console.log(e.detail.value, 'getname');
  },
  getPrice(e) {
    this.setData({
      price: e.detail.value
    })
  },
  reset() {
    this.setData({
      name: '',
      price: ''
    })
  },
  async addGood() {
    let {
      name,
      price
    } = this.data
    if (name == '') {
      wx.showToast({
        icon: 'none',
        title: '请填写商品名',
      })
      return
    }
    if (price == '') {
      wx.showToast({
        icon: 'none',
        title: '请填写价格',
      })
      return
    }
    let data = {
      name,
      price
    }
    try {
      const db = wx.cloud.database()
      await db.collection("goods").add({
        data
      })
      await this.getList()
      await wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      await this.reset()
    } catch (err) {
      console.warn(err);
    }
  },
  async remove(e) {
    let {
      name,
      _id
    } = e.currentTarget.dataset.item
    let res = await wx.showModal({
      title: '提示',
      content: `确定要删除 ${name} 吗`
    })
    if (res.confirm) {
      try {
        const db = wx.cloud.database()
        await db.collection("goods").doc(_id).remove()
        await this.getList()
        await wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      } catch (err) {
        console.warn(err);
      }
    }
  }
})