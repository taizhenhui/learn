Page({
  data: {
    list: [],
    id: '',
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
        this.setData({
          list: res.data
        })
      })
  },
  update() {
    // let {id, name, price} = this.data
    wx.cloud.database().collection('goods')
      .doc('ac74c0026361d83e0058bdd57c028292')
      .update({
        data:{
          price: 30 
        }
      })
      .then(res => {
        console.log(res, '成功');
        // this.getList()
      })
      .catch(err => {
        console.log(err);
      })
  }
})