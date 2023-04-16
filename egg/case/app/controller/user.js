const Controller = require('egg').Controller
class UserController extends Controller {
  async login() {
    const model = {
      title: '登录',
      error: '',
      loginId: '',
    }
    await this.ctx.render('login', model)
  }

  async handleLogin() {
    const { body } = this.ctx.request
    const result = await this.service.user.login(body.loginId, body.loginPwd)
    if (result) {
      // 登录成功
      this.ctx.cookies.set('token', result.token)
      this.ctx.redirect('/')
    } else {
      // 登录失败
      const model = {
        title: '登录',
        error: '账号密码不正确',
        loginId: body.loginId,
      }
      await this.ctx.render('login', model)
    }
  }
}

module.exports = UserController
