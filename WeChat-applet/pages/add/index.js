// pages/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getList()
  },
  add(){
    const db = wx.cloud.database()
    db.collection('goods')
      .add({
        data: {
          name: '桃子',
          price: 24
        }
      })
      .then(res => {
        console.log('成功', res);
        this.getList()
      })
      .catch(err => {
        console.log('失败', err);
      })
  },
  getList(){
    const db = wx.cloud.database()
    db.collection('goods')
    .get()
    .then(res=>{
      this.setData({
        list:res.data
      })
    })
  }
})