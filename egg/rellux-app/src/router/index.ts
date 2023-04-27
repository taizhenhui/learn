import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router";
import {useUserStore} from '@/store'
import Login from '@/views/login/index.vue'
import LayoutView from '@/views/layout/index.vue'

/**
 * 路由模块导入
 */
import systemRouter from './modules/systemRouter';
import brandRouter from './modules/brandRouter';


declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, undefined> {
    // permisson?: string;
    icon?: string;
    title?: string;
  }
}

export const MENU_ROUTE_NAME = 'menuRoute'
export const HOME_ROUTE_NAME = 'Home'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    redirect: '/',
    children: [
      {
        name: HOME_ROUTE_NAME,
        path: '/',
        component: () => import('@/views/home/index.vue')
      },
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...systemRouter,
      ...brandRouter,
      ...brandRouter,
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: ()=> import('@/views/NotFound/index.vue')
  }

]


const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 })  // 跳转页面回到顶部
})


const whiteList = [
  '/login'
]
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  if (!userStore.token) {
    whiteList.indexOf(to.path) !== -1 ? next() : next(`login?redirect=${to.path}`)
    return
  }
  if (userStore.token && to.path === '/login') {
    next({ path: '/' })
    return
  }
  next()
})


export default router