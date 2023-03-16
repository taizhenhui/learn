import "./mock";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.less'
import { showMessage } from './utils';
import './eventBus'
import store from './store'

store.dispatch('setting/fetchSetting')

Vue.prototype.$showMessage = showMessage

// 注册全局指令
import vloading from "./directives/loading";
import vlazy from './directives/lazy'
Vue.directive('loading', vloading)
Vue.directive('lazy', vlazy)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
