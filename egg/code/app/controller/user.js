const Controller = require('egg').Controller;

class UserController extends Controller {
  async login(){
    this.ctx.body = '登录'
  }
}

module.exports = UserController;