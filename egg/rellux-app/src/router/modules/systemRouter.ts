import type { RouteRecordRaw } from "vue-router";
import PageLayoutView from '@/views/layout/pageLayout.vue'


const systemRouter: Array<RouteRecordRaw> = [
  {
    name: 'system',
    path: 'system',
    component: PageLayoutView,
    meta: {
      title: '系统管理',
      icon: 'systemCenter',
    },
    children: [
      {
        name: 'systemRole',
        path: 'role',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/views/system/role/index.vue'),
      },
      {
        name: 'systemAccount',
        path: 'account',
        meta: {
          title: '账号管理',
        },
        component: () => import('@/views/system/account/index.vue'),
      },
    ]
  },
]

export default systemRouter