// pages/shujuku/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    good:{}
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
    
    db.collection('goods')
    // .where({ // 查询条件
    //   name:'苹果',
    // })
    .doc("9890f4c66361d59e006dbc01034417bf")
    .get().then( res => {
      console.log(res.data,'res');
      this.setData({
        good: res.data 
      })
    }).catch(err=>{
      console.log(err);
    })
  },

})