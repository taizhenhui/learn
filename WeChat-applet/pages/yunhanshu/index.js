Page({
  data:{},
  onLoad(){
    wx.cloud.callFunction({
      name:'getData'
    }).then(res=>{
      console.log(res);
      // this.setData({
      //   openid:res.result.openid
      // })
    }).catch(err=>console.log(err))

    wx.cloud.callFunction({
      name:'updata_good'
    }).then(res=>{
      console.log(res,'updata_good');
    }).catch(err=>console.log(err))

  }
})