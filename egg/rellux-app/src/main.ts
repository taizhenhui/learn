import { createApp } from 'vue'
import './styles/global.less'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import { piniaPlugin } from "./store/piniaPlugin"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPlugin({
  key: "rellux-key",
}))
app.use(router)
app.use(pinia)

app.mount('#app')
