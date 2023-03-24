// pages/component/component.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: 'content--content',
    count: 100,
  },

  handleEvent(e){
    console.log(e.detail,'123');

  },
  tapHandle(){
    const child = this.selectComponent('.item')
    console.log(child);
  }

})