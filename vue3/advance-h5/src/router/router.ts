import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "OrderList",
    meta:{
      title: "订单列表"
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/OrderList/index.vue"),
  },
  
]


export default routes