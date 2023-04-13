import { defineStore } from 'pinia'

type AppState = {
  phone: string
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    const phone = '15221424503'
    return {
      phone
    }
  },
  actions: {

  },
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
  }
})