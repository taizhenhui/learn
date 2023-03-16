import { getBanners } from '@/api/banner'
export default {
  namespaced: true,
  state: {
    loading: false,
    datas: [],

  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload
    },
    setDatas(state, payload){
      state.datas = payload
    }
  },
  actions: {
    async fetchBanners(ctx){
      if(ctx.state.datas.length)  return
      ctx.commit('setLoading', true)
      const resp = await getBanners()
      ctx.commit('setDatas', resp)
      ctx.commit('setLoading', false)
    }
  }
}