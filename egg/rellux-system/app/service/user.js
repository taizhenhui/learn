const Service = require('egg').Service

module.exports = class extends Service {
  async index() {

    const results = await this.app.mysql.select('t_system_account');
    return results
  }
  async findByName(account) {
    try {
      const result = await this.app.mysql.get('t_system_account', { account });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(account, password) {
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, app.config.jwt.secret);

    ctx.body = {
      code: 200,
      message: '登录成功',
      data: {
        token
      },
    };
  }
}