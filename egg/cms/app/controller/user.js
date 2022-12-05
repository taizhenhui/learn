
'use strict';
const svgCaptcha = require('svg-captcha')
const { sign } = require('jsonwebtoken')
const BaseController = require('./base');
class Controller extends BaseController {
  constructor(...args) {
    super(...args)
    this.entity = 'user'
  }
  // 验证码
  async captcha() {
    const { ctx } = this
    const { text: svgText, data: svgData } = svgCaptcha.create({
      size: 4,
      color: true,
      ignoreChars: '0o1i'
    })
    ctx.session.captcha = {
      svgText:svgText,
      expires: new Date(Date.now() + 60*1000*5)
    } // 把文本信息放到会话中的captcha属性中
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.body = svgData
  }
  async checkCaptcha() {
    const { ctx } = this
    let captcha = ctx.request.body.captcha
    let {svgText, expires} = ctx.session.captcha
    if (captcha.toLowerCase() === svgText.toLowerCase() && new Date(Date.now()) < expires) {
      ctx.body = '验证成功'
    } else {
      ctx.body = '验证失败'
    }
  }
  async signup() {
    const { ctx, service } = this
    let body = ctx.request.body
    const result = await service.user.create(body)
    result ? this.success('注册成功') : this.error('注册失败')
  }
  async signin() {
    const { service } = this
    const result = await service.user.signin()
    result && result.length > 0
      ? this.success(sign({...result[0], password: ''}, this.config.jwtSecret))
      : this.error('登录失败')

  }
}

module.exports = Controller
