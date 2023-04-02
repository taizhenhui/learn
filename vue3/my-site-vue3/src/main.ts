import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.less'
import "./mock";
import { showMessage } from './utils';
const app = createApp(App)

app.config.globalProperties.$showMessage = showMessage;
app.use(router)
app.mount('#app')
