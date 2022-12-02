
'use strict';

const { Controller } = require('egg');

class BaseController extends Controller{

  async index(){
    const {service} = this
    let list = await service[this.entity].list()
    this.success(list)
  }
  async create(){
    const {ctx,service} = this
    let entity = ctx.request.body
    await service[this.entity].create(entity)
    this.success('success')
  }
  async update() {
    const {ctx,service} = this
    let id = ctx.params.id
    let entity = ctx.request.body
    entity.id = id
    await service[this.entity].update(entity)
    this.success('success')
  }
  async destroy() {
    const {ctx, service} = this
    let id = ctx.params.id
    await service[this.entity].destroy(id)
    this.success('success')
  }
  success(data){
    this.ctx.body = {
      code: 0,
      data,
    }
  }
  error(error){
    this.ctx.body = {
      code: 1,
      error,
    }  
  }
}

module.exports = BaseController
