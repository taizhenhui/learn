Page({
  data:{
    list:[]
  },
  onLoad(){
    this.getList()
  },
  getList(){
    const db = wx.cloud.database()
    db.collection('goods').get()
    .then(res => {
      console.log(res);
      this.setData({
        list:res.data
      })
    })
  },
  remove(e){
    let id = e.currentTarget.dataset.item._id
    const db = wx.cloud.database()
    db.collection('goods').doc(id)
    .remove()
    .then(res=>{
      console.log(res);
      this.getList()
    })
    .catch(err=>{
      console.log(err);
    })
  }
})