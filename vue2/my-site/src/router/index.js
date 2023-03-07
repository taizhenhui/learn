import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router); 

const router = new Router({
  // 配置
  routes, // 路由匹配规则
  mode: "history",
});
export default router;