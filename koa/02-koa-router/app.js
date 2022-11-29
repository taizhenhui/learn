// 引入模块
const koa = require('koa')
const router = require('./router/index')
// 实例化
// const router = new Router()
const app = new koa()


// 配置路由
// ctx 上下文 context ，包含了 request 和 response 等信息
// router
//   .get('/', async ctx => {
//     ctx.body = 'hello koa2-router'  // 返回数据
//   })
  // .get('/news', async ctx => {
  //   console.log(ctx.querystring); // 获取的是一个字符串
  //   console.log(ctx.query); // 获取的是一个对象 用的最多
  //   console.log(ctx.url);
  //   console.log(ctx.request.url);
  //   ctx.body = '这是一个新闻页面'
  // })
  // .get('/newscontent/:id', async ctx => {
  //   console.log(ctx.params);
  //   ctx.body = ctx.params
  // })
  // .get('/newscontent/:name/:id', async ctx => {
  //   console.log(ctx.params);
  //   ctx.body = ctx.params
  // })

app.use(router.routes()) // 启动路由
app.use(router.allowedMethods()) 
/* router.allowedMethods()
主要用于 405 Method Not Allowed 这个状态码相关
如果不加这个中间件，如果接口是get请求，而前端使用post请求，会返回 404 状态码，接口未定义。
如果加了这个中间件，这种情况时，会返回405 Method Not Allowed ，提示 request method 不匹配，并在响应头返回接口支持的请求方法，更有利于调试
*/  





app.listen(3000, () => {
  console.log('服务启动了 http://127.0.0.1:3000');
})