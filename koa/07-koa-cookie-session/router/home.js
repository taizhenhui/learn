const homeRouter = require('koa-router')()


homeRouter
  .get('/', async (ctx, next) => {
    // 获取cookie
    // console.log(ctx.cookies.get('name'));
    // 设置cookie
    // ctx.cookies.set('gender','man')
    await ctx.render('home', {username:'tai'})
  })




module.exports = homeRouter