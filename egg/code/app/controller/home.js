const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(){
    await this.ctx.render('home', {title:'服务端渲染的页面'});
    // this.ctx.body = '你好111'
  }
}

module.exports = HomeController