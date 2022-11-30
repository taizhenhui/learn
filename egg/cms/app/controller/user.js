
'use strict';

const { Controller } = require('egg');
/**
 * @Controller 用户
 */
class UserController extends Controller{
  /**
  * @summary 获取用户列表
  * @description 获取用户列表
  * @router get /api/user
  * @response 200 baseResponse
  */
  async index(){
    const {ctx, service} = this
    let users = await service.user.list()
    ctx.body = users
  }

  /**
  * @summary 创建用户
  * @description 创建用户用户列表
  * @router post /api/user
  * @request body postUserParams *body
  * @response 200 postUserParams
  */
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
