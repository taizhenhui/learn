import { createRouter, createWebHashHistory } from "vue-router";
import routes from './router'

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
  strict: true,   
  scrollBehavior: () => ({ top: 0, left: 0 })  // 跳转页面回到顶部
});

export default router;
