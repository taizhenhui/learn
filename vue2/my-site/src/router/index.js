import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import { titleController } from '@/utils'
Vue.use(Router);

const router = new Router({
  // 配置
  routes, // 路由匹配规则
  mode: "history",
});


router.afterEach((to, from) => {
  if (to.meta.title) titleController.setRouterTitle(to.meta.title) 
})

export default router;