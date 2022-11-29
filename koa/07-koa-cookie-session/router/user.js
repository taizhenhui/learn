const userRouter = require('koa-router')()


userRouter
  .post('/', async (ctx, next) => {
    console.log(ctx.request.body); // 获取前端传来的参数 不可以简写
    ctx.body = {
      ok:1,
      info: ctx.request.body
    }
  })
  .post('/login', async (ctx, next) => {
    console.log(ctx.request.body); // 获取前端传来的参数 不可以简写
    let {username, password} = ctx.request.body
    if(username !== 'tai' || password !== '123'){
      ctx.body = {
        ok:0,
        info: ctx.request.body
      }
    }else{
      // 
      ctx.session.user = {
        username: 'tai'
      }
      ctx.body = {
        ok:1,
        info: ctx.request.body
      }
    }
  })
  .get('/', async (ctx, next) => {
    console.log(ctx.query, ctx.querystring);
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