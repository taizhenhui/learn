import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router";

import LayoutView from '@/views/layout/index.vue'

/**
 * 路由模块导入
 */
import systemRouter from './modules/systemRouter';
import brandRouter from './modules/brandRouter';

export const MENU_ROUTE_NAME = 'menuRoute'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, undefined> {
    // permisson?: string;
    icon?: string;
    title?: string;
  }
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    children: [
      ...systemRouter,
      ...brandRouter,
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 })  // 跳转页面回到顶部
})


export default router