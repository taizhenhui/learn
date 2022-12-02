
'use strict';
const svgCaptcha = require('svg-captcha')
const jwt = require('jsonwebtoken')
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
    ctx.session.captcha = svgText // 把文本信息放到会话中的captcha属性中
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.body = svgData
  }
  async checkCaptcha() {
    const { ctx } = this
    let captcha = ctx.request.body.captcha
    if (captcha.toLowerCase() === ctx.session.captcha.toLowerCase()) {
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
    result && result.length > 0 ? this.success('登录成功') : this.error('登录失败')

  }
}

module.exports = Controller
