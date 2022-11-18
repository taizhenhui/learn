// index.js
Page({
  data:{
    username:'',
    password:'',
    definedPassword:'',
  },
  login(){
    let {username, password, definedPassword} = this.data
    if(username == ''){
      wx.showToast({
        icon:'none',
        title: '用户名不能为空',
      })
      return
    }
    if(password == ''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
      return
    }
    if(definedPassword == ''){
      wx.showToast({
        icon:'none',
        title: '确认密码不能为空',
      })
      return
    }
    console.log(username, password,definedPassword);
  }
})
