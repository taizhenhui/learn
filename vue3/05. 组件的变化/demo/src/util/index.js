import { defineAsyncComponent, h} from 'vue'

import Error from '../components/Error.vue'
import Loading from '../components/Loading.vue'

import 'nprogress/nprogress.css'
import  NProgress  from "nprogress";

NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false,
});

export function delay(duration){
  if(!duration){
    duration = random(1000, 3000)
  }
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

export function random(min, max) {
  return Math.floor(Math.random() *(max - min) + min)
}

// 得到一个异步组件
export function getAsyncComponent(path) {
  return defineAsyncComponent({
    loader: async () => {
      await delay()
      if(Math.random() < 0.5){
        return import(path)
      }
      throw new Error()
      
    },
    loadingComponent: Loading, // 当promise在pending状态时，显示这个组件
  
    errorComponent: {
      render(){
        return h(Error, '组件加载出错')
      }
    },
  })
}

// 得到一个异步页面
export function getAsyncPage(path){
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start()
      await delay()
      const comp = await import(path)
      NProgress.done()
      return comp
    },
    loadingComponent: Loading, // 当promise在pending状态时，显示这个组件
  })
}
// 实际开发 得到一个异步组件
// export function getAsyncComponent(path) {
//   return defineAsyncComponent({
//     loader: () => import(path) ,
//     loadingComponent: Loading, // 当promise在pending状态时，显示这个组件
  
//     errorComponent: {
//       render(){
//         return h(Error,'出错了！！！')
//       }
//     },
//   })
// }