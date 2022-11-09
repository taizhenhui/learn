Page({
  data: {
    list: [],
    name: '',
    price: '',
    type: ''

  },
  onShow() {
    this.getList()
  },
  async getList(e) {  
    let c= await wx.cloud.callFunction({
      name:'add',
      data:{
        a:1,
        b:2
      }
    })
    console.log(c.result.sum,'ccccccccccc');
    let {
      type
    } = this.data
    if (type == '') type = e == undefined ? 'get' : e.currentTarget.dataset.type == 'up' ? 'asc' : 'desc'
    const db = wx.cloud.database().collection('goods')
    try {
      let res = type == 'get' ? await db.get() : await db.orderBy('price', type).get()
      this.setData({
        list: res.data
      })
    } catch (err) {
      console.log(err);
    }

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
      price: Number(price)
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