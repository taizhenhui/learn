const loginRouter = require('koa-router')()


loginRouter
  .get('/', async (ctx, next) => {
    // 获取cookie
    // console.log(ctx.cookies.get('name'));
    // 设置cookie
    // ctx.cookies.set('gender','man')
    await ctx.render('login')
  })




module.exports = loginRouter