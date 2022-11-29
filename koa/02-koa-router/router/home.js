const homeRouter = require('koa-router')()


homeRouter
  .get('/', async (ctx, next) => {
    ctx.body = `<h1>home</h1>`
  })




module.exports = homeRouter