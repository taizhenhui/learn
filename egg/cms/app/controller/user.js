
'use strict';

const { Controller } = require('egg');

class UserController extends Controller{
  async index(){
    const {ctx, service} = this
    let users = await service.user.list()
    ctx.body = users
  }

  async create(){
    const {ctx,service} = this
    let user = ctx.request.body
    await service.user.create(user)
    ctx.body = {
      code: 0,
      data: 'success'
    }
  }
}

module.exports = UserController
