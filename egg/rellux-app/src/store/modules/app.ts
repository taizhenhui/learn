import { defineStore } from "pinia"
import { RouteRecordName } from "vue-router"

type AppStore = {
  token: string,
  menuCollapse: boolean,
  activeIndex: number,
  activeName: RouteRecordName,
}
export const useAppStore = defineStore('app', {
  state: (): AppStore => {
    return {
      token: '',
      menuCollapse: false,
      activeIndex: -1,
      activeName: ''
    }
  },
  actions: {
  },
})