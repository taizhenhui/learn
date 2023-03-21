// index.js
// 获取应用实例
const app = getApp()
Page({
  data:{
    name:'zhangshan'
  },
  onLoad(){
    console.log(app.globalData);
  }
})