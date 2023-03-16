import * as userApi from '@/api/user'
export default {
  namespaced: true, // 开启命名空间
  state: {
    loading: false, // 是否正在登录中
    user: null // 当前登录的用户对象
  },
  getters: {
    status(state){
      if(state.loading){
        return 'loading'
      }else if(state.user){
        return 'login'
      }else{
        return 'unlogin'
      }
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async login(ctx, payload) {
      ctx.commit('setLoading', true)
      const resp = await userApi.login(payload.loginId, payload.loginPwd)
      ctx.commit('setUser', resp)
      ctx.commit('setLoading', false)
      return resp
    },
    async whoAmI(ctx, payload) {
      ctx.commit('setLoading', true)
      const resp = await userApi.whoAmI()
      ctx.commit('setUser', resp)
      ctx.commit('setLoading', false)
      return resp
    },
    async loginOut(ctx, payload) {
      ctx.commit('setLoading', true)
      await userApi.loginOut()
      ctx.commit('setUser', null)
      ctx.commit('setLoading', false)
    },
  }
}