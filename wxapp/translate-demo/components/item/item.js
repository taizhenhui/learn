// components/item/item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: 'content的默认值'
    },
    count:Number
  },
  options:{
    multipleSlots:true
  },

  /**
   * 组件的初始数据
   */
  data: {
    iptVal:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    emitFatherData(){
      var myEventDetail = {
        val:this.data.iptVal
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myEvent', myEventDetail)
    },
    handleInput(){}
  }
})