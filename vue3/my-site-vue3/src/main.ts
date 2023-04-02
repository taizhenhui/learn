import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.less'
import "./mock";
import { showMessage } from './utils';
const app = createApp(App)

app.config.globalProperties.$showMessage = showMessage;
// 注册全局指令
import vloading from "./directives/loading";
// import vlazy from './directives/lazy'
app.directive('loading', vloading)
// app.directive('lazy', vlazy)


app.use(router)
app.mount('#app')
