// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标  1表示显示  0表示不显示
      title: '标题', //导航栏 中间的标题
      white: false, // 是就显示白的，不是就显示黑的。
      address: '../../assets/imgs/background.png' // 加个背景 不加就是没有
     },
     // 导航头的高度
     height: app.globalData.height * 2 + 20
  },

})
