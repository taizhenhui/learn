Page({
  data: {
    list: [],
    name: '',
    price: '',
    type: '',
    img:'',
  },
  onShow() {
    wx.startPullDownRefresh()
    this.getList()
  },
  onPullDownRefresh(){
    this.getList()
  },
  async getList(e) {  
    let {
      type
    } = this.data
    if (type == '') type = e == undefined ? 'get' : e.currentTarget.dataset.type == 'up' ? 'asc' : 'desc'
    const db = wx.cloud.database().collection('goods')
    try {
      let res = type == 'get' ? await db.get() : await db.orderBy('price', type).get()
      wx.stopPullDownRefresh()
      this.setData({
        list: res.data
      })
    } catch (err) {
      console.log(err);
    }
  },
  async uploadImg(){
    try {
      let res = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera']
      })
      console.log('res',res);
      let resImg = await wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: `${+new Date()}.jpg`,
        // 指定要上传的文件的小程序临时文件路径
        filePath: res.tempFiles[0].tempFilePath,
      })
      this.setData({
        img:resImg.fileID
      })
      // console.log('resImg',resImg);
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
      price: '',
      img:''
    })
  },
  async addGood() {
    let {
      name,
      price,
      img
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
    if (img == '') {
      wx.showToast({
        icon: 'none',
        title: '请上传图片',
      })
      return
    }
    let data = {
      name,
      price: Number(price),
      img
    }
    try {
      // const db = wx.cloud.database()
      // await db.collection("goods").add({ data })
      await wx.cloud.callFunction({
        name: 'add_good',
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
        // const db = wx.cloud.database()
        // await db.collection("goods").doc(_id).remove()
        await wx.cloud.callFunction({
          name: 'remove_good',
          data: { id: _id }
        })
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