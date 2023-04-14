const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const resp2 = await this.app.axios.get(`${this.config.$apiBase}/api/local`)
    const model = {
      title: '首页',
      provinces: resp2.data
    }
    await this.ctx.render('home', model)
  }

  async css() {
    const view = await this.ctx.renderView('css.ejs', {
      isBlackAndWhite: !!this.ctx.query.special,
    })
    this.ctx.body = view
    this.ctx.type = 'text/css'
  }
}

module.exports = HomeController