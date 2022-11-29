const koa = require('koa')

const app = new koa()

// 配置中间件
// express写法
// app.use(function(req, res, next) {
//   next()
// })

// koa写法
app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})


// 配置路由

app.listen(3000, () => {
  console.log('服务启动了 http://127.0.0.1:3000');
})