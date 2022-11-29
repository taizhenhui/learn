const koa = require('koa')
const Router = require('koa-router')
const app = new koa()
const router = new Router()


// app.use(async (ctx, next)=>{
//   console.log('全局中间件-应用级别中间件');
//   ctx.body = '中间件'
//   await next()
// })




router.get('/', async ctx => {
  
  ctx.body = '首页'
})

router.get('/news', async (ctx,next) => {
  console.log('路由级别中间件');
  await next()
})
const mw = async (ctx,next) => {
  console.log('路由级别中间件00');
  await next()
}
const mw11 = async (ctx, next) => {
  console.log('路由级别中间件11');
  await next()
}
router.get('/news',mw, mw11, async ctx => {
  ctx.body = '新闻'
})

app.use(router.routes())
// app.use(router.allowedMethods())

app.use( async (ctx, next) => {
  try{
    await next()
  }catch(err){
    console.log(err);
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit("error", err, ctx)
  }
})

app.listen(3000, () => {
  console.log('服务启动了 http://127.0.0.1:3000');
})