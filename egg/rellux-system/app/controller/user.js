const Controller = require('../core/base_controller');
const svgCaptcha = require('svg-captcha');
module.exports = class extends Controller {
  async index() {
    const result = await this.service.user.index()
    this.success(result)
  }
  async login() {
    const { account, password, code } = this.ctx.request.body
    if (!account || !password || !code) {
      this.fail('账号、密码、验证码不能为空')
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

    let verify = this.ctx.session.captcha;     //获得session中的验证码
    if (code.toUpperCase() !== verify.toUpperCase()) {
      this.fail('验证码错误')
      return
    }

    const token = this.app.jwt.sign({
      id: accountInfo.id,
      account: accountInfo.account,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, this.app.config.jwt.secret);

    this.success({ token })
  }

  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,              //图片验证码的字符数
      fontSize: 42,
      ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',    //忽略的一些字符
      width: 100,
      height: 38,
      noise: 2,
      color: true,
      background: '#FFF',
    });
    this.ctx.session.captcha = captcha.text;       //text及data都是函数返回的string属性的对象  将图片验证码中的text传到session里边 
    this.ctx.response.type = 'image';     //返回的类型
    // this.ctx.body = captcha.data;                //返回一张图片
    this.success({ captcha: captcha.data })
  }
}