const { Controller } = require('egg');

module.exports = class BaseController extends Controller {

  success(data) {
    this.ctx.body = {
      code: 0,
      message: '',
      data,
    };
  }

  fail(message) {
    this.ctx.body = {
      code: -1,
      message,
      data: null
    };
  }
  
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}