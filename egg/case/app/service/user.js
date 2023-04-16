const Service = require('egg').Service

module.exports = class extends Service {

  async login(loginId, loginPwd){
    const url = `${this.config.$apiBase}/api/user/login`;
    const resp = await this.app.axios.post(url, {loginId, loginPwd})
    if (resp.data.code) {
      // 登录失败
      return false
    } else {
      return {
        user: resp.data.data,
        token: resp.headers.authorization
      }
    }
  }

  async whoAmI (token){
    if (!token) return null
    
    const resp = await this.app.axios.get(this.config.$apiBase + '/api/user/whoami', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    if (resp.data.code) return null
  
    return resp.data.data

  }

}