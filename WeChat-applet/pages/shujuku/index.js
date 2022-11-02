// pages/shujuku/index.js
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
  onLoad(options) {
    // 固定写法
    let db = wx.cloud.database()
    // // 传统写法
    // db.collection('goods').get({ // 查询操作
    //   success(res) { // 成功
    //     console.log(res.data, 'res');
    //   },
    //   fail(err) { // 失败
    //     console.log(err, 'err');
    //   }
    // })

    // es6-promise写法
    db.collection('goods').get().then( res => {
      console.log(res.data,'res');
      this.setData({
        list: res.data 
      })
    }).catch(err=>{
      console.log(err);
    })
  },

})