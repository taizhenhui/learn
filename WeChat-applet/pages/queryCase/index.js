Page({
  data:{
    key: '',
    list: []
  },
  getValue(e){
    this.setData({
      key: e.detail.value
    })
  },
  query(){
    let db = wx.cloud.database()
    const _ = db.command
    let {key} = this.data
    if(!key){
      wx.showToast({
        icon:'none',
        title: '请输入内容',
      })
      return
    }
    db.collection('news') 
    .where(_.or([ 
      {
        content: db.RegExp({
          regexp: key
        })
      }
    ]))
    .get()
    .then(res=>{
      console.log(res);
      this.setData({
        list:res.data
      })
    }).catch(err=>console.log(err))
  },
})