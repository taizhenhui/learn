const Controller = require('egg').Controller;
const axios = require('axios')
class UserController extends Controller {
  async login() {
    const model = {
      title: '登录--地区数据库',
      error: '',
      loginId: ''
    }
    await this.ctx.render('login', model)
  }
  async handleLogin() {
    const url = `${this.config.$apiBase}/api/user/login`;
    const { body } = this.ctx.request
    const resp = await this.app.axios.post(url, body)
    if (resp.data.code) {
      // 登录失败
      const model = {
        title: '登录--地区数据库',
        error: resp.data.message,
        loginId: body.loginId
      }
      await this.ctx.render('login', model)
    } else {
      const token =  resp.headers.authorization
      this.ctx.cookies.set('token', token)
      this.ctx.redirect('/')
    }
  }
}

module.exports = UserController