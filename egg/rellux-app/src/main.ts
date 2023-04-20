import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import 'element-plus/dist/index.css'
import './assets/css/main.css'
import piniaPersist from 'pinia-plugin-persist'
import moment from 'moment'
const app = createApp(App)

// 公共方法
app.config.globalProperties.$moment = moment

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(router)
app.use(pinia)

app.mount('#app')
