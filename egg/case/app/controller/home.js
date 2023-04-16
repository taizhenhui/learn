const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const provinces = await this.service.local.getProvinces();
    const model = {
      title: '首页',
      provinces
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