const listRouter = require('koa-router')()


listRouter
  .post('/', async (ctx, next) => {
    ctx.body = {
      ok:1,
      info:'add list success'
    }
  })
  .get('/', async (ctx, next) => {
    ctx.body = ['aa', 'bb', 'cc']
  })
  .put('/:id', async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
      ok: 1,
      info:'put list success'
    }
  })




module.exports = listRouter