const userRouter = require('koa-router')()


userRouter
  .post('/', async (ctx, next) => {
    ctx.body = {
      ok:1,
      info:'add user success'
    }
  })
  .get('/', async (ctx, next) => {
    ctx.body = ['aa', 'bb', 'cc']
  })
  .put('/:id', async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
      ok: 1,
      info:'put user success'
    }
  })




module.exports = userRouter