
'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {

  async index() {
    const { ctx, service } = this
    const { pageNum, pageSize, ...where } = ctx.query
    let list = await service[this.entity].list(isNaN(pageNum) ? 1 : parseInt(pageNum), isNaN(pageSize) ? 10 : parseInt(pageSize), where)
    this.success(list)
  }
  async create() {
    const { ctx, service } = this
    let entity = ctx.request.body
    const result = await service[this.entity].create(entity)
    result ? this.success('success') : this.error('创建失败')
  }
  async update() {
    const { ctx, service } = this
    let id = ctx.params.id
    let entity = ctx.request.body
    entity.id = id
    const result = await service[this.entity].update(entity)
    result ? this.success('success') : this.error('修改失败')
  }
  async destroy() {
    const { ctx, service } = this
    let id = ctx.params.id
    const result = await service[this.entity].destroy(id)
    result ? this.success('success') : this.error('修改失败')
  }
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    }
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error,
    }
  }
}

module.exports = BaseController
