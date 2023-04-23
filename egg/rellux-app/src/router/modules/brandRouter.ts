import type { RouteRecordRaw } from "vue-router";
import PageLayoutView from '@/views/layout/pageLayout.vue'


const brandRouter: Array<RouteRecordRaw> = [
  {
    name: 'brand',
    path: 'brand',
    component: PageLayoutView,
    meta: {
      title: '品牌中心',
      icon: 'brandCenter',
    },
    children: [
      {
        name: 'BrandBrandMan',
        path: 'brandMan',
        meta: {
          title: '品牌管理',
        },
        component: () => import('@/views/brand/brandMan/index.vue'),
      },
      {
        name: 'BrandStoreMan',
        path: 'storeMan',
        meta: {
          title: '门店管理',
        },
        component: () => import('@/views/brand/storeMan/index.vue'),
      },
    ]
  },
]

export default brandRouter