'use strict';

const { Controller } = require('egg');
/**
 * @Controller 测试
 */
class TestController extends Controller {
   /**
    * @summary 接口测试
    * @description 测试Description
    * @router get /api/test
    * @request query string str 随机字符串
    * @response 200 baseResponse
    */
  async test() {
    const { ctx } = this;
    const str = ctx.query.str
    ctx.body = await {
        message: 'swagger is OK!!! and query is:' + str
    }
  }
}

module.exports = TestController;
