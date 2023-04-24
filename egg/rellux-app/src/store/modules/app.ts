import { defineStore } from "pinia"
import { RouteRecordName } from "vue-router"

type AppStore = {
  menuCollapse: boolean,
  activeIndex: number,
  activeName: RouteRecordName,
}
export const useAppStore = defineStore('app', {
  state: (): AppStore => {
    return {
      menuCollapse: false,
      activeIndex: -1,
      activeName: ''
    }
  },
  actions: {
  },
})