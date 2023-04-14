const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const token = this.ctx.cookies.get('token');
    if (!token) {
      this.ctx.redirect('/login')
      return
    }
    const resp = await this.app.axios.get(this.config.$apiBase + '/api/user/whoami', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    if (resp.data.code) {
      // 登录过期
      this.ctx.redirect('/login')
      return
    }
    const model = {
      title: '首页--地区数据库',
      user: resp.data.data
    }
    const resp2 = await this.app.axios.get(`${this.config.$apiBase}/api/local`)
    model.provinces = resp2.data
    await this.ctx.render('home', model)
  }
}

module.exports = HomeController