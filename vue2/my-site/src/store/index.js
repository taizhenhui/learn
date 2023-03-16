import Vue from "vue";
import Vuex from 'vuex'
import banner from './banner'
import setting from './setting'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    banner,
    setting
  },
  strict: true,   // 开启严格模式后，只允许通过mutation改变
})