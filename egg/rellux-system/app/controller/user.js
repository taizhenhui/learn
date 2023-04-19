const Controller = require('egg').Controller;

module.exports = class extends Controller {
  async index() {
    const result = await this.service.user.index()
    this.ctx.body = result
    return result
  }
  async login() {
    const { account, password } = this.ctx.request.body;
    if (!account || !password) {
      this.ctx.body = {
        code: -1,
        msg: '账号或密码不能为空',
        data: null
      }
      return
    }

    const accountInfo = await this.service.user.findByName(account) // 获取用户信息

    // 判断是否已经存在
    if (!accountInfo || !accountInfo.id) {
      this.ctx.body = {
        code: -1,
        msg: '账号不存在',
        data: null
      }
      return
    }
    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (password != accountInfo.password) {
      this.ctx.body = {
        code: -1,
        msg: '账号密码错误',
        data: null
      }
      return
    }



    const token = this.app.jwt.sign({
      id: accountInfo.id,
      account: accountInfo.account,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, this.app.config.jwt.secret);

    this.ctx.body = {
      code: 0,
      message: '登录成功',
      data: {
        token
      },
    };
  }
}