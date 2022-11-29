const homeRouter = require('koa-router')()


homeRouter
  .get('/', async (ctx, next) => {
    await ctx.render('home', {username:'tai'})
  })




module.exports = homeRouter