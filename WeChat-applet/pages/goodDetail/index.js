Page({
  data: {
    id: '',
    good: {},
    setPrice: ''
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getDetail()
  },
  reset() {
    this.setData({
      setPrice: ''
    })
  },
  async modify() {
    let {
      id,
      setPrice
    } = this.data
    console.log(id,'iddddddd');
    if (setPrice == '') {
      wx.showToast({
        icon: "none",
        title: '请输入价格',
      })
      return
    }
    try {
      const db = wx.cloud.database()
      // 直接操作数据库
      // await db.collection("goods")
      //   .doc(id)
      //   .update({
      //     data: {
      //       price: Number(this.data.setPrice)
      //     }
      //   })
      // 调用云函数
      await wx.cloud.callFunction({
        name:'updata_good',
        data:{
          id:id,
          price: Number(this.data.setPrice)
        }
      })
      await this.getDetail()
      await this.reset()
      await wx.showToast({
        title: '修改成功',
        icon: 'success'
      })
    } catch (err) {
      console.log(err);
    }
  },

  async getDetail() {
    let {
      id
    } = this.data
    try {
      const db = wx.cloud.database()
      let res = await db.collection('goods').doc(id).get()
      this.setData({
        good: res.data
      })
    } catch (err) {
      console.warn(err);
    }
  }
})