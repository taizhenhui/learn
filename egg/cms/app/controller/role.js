
'use strict';

const BaseController = require('./base');
class Controller extends BaseController {
  constructor(...args) {
    super(...args)
    this.entity = 'role'
  }
  async getResource() {
    const { ctx, service } = this
    const result = await service.role.getResource()
    ctx.body = result
  }
}

module.exports = Controller
