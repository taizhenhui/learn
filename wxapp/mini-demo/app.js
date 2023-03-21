// app.js
App({
  onLaunch(options) {
    console.log('onLaunch',options);
  },
  onShow(options){
    console.log('onShow',options);
  },
  onHide(){
    console.log('onHide');
  },
  globalData: {
    userInfo: null
  }
})
