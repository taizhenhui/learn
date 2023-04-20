const Controller = require('../core/base_controller');

module.exports = class extends Controller {
  async index() {
    this.ctx.body = '<h1>role</h1>';
  }
}