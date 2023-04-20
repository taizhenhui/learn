const Controller = require('../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const result = await this.service.user.index()
    this.success(result)
  }
  async login() {
    const { account, password } = this.ctx.request.body
    if (!account || !password) {
      this.fail('账号或密码不能为空')
      return
    }

    const accountInfo = await this.service.user.findByName(account) // 获取用户信息

    // 判断是否已经存在
    if (!accountInfo || !accountInfo.id) {
      this.fail('账号不存在')
      return
    }
    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (password != accountInfo.password) {
      this.fail('账号密码错误')
      return
    }



    const token = this.app.jwt.sign({
      id: accountInfo.id,
      account: accountInfo.account,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, this.app.config.jwt.secret);

    this.success({ token })
  }
}