import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
import { login } from "@/api";
import { ILoginReq } from "@/api/types";

type UserStore = {
  routers: Array<RouteRecordRaw>
  token: string
}
export const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      routers: [],
      token: ''
    }
  },
  actions: {
    async fatchLogin(from: ILoginReq): Promise<void> {
      const { token } = await login(from)
      this.token = token
    }
  },
})