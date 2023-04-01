import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/Home/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于',
    },
    component: () =>
      import(/* webpackChunkName: "About" */ '@/views/About/index.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: {
      title: '文章',
    },
    component: () =>
      import(/* webpackChunkName: "Blog" */ '@/views/Blog/index.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      title: '评论',
    },
    component: () =>
      import(/* webpackChunkName: "Message" */ '@/views/Message/index.vue'),
  },
  {
    path: '/project',
    name: 'Project',
    meta: {
      title: '项目',
    },
    component: () =>
      import(/* webpackChunkName: "Project" */ '@/views/Project/index.vue'),
  },
]

export default routes
