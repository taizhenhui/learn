import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"


type UserStore = {
  routers: Array<RouteRecordRaw>
}
export const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      routers: []
    }
  },
  actions: {

  },
})