const koa = require('koa')
const static = require('koa-static')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const views = require('koa-views')

const router = require('./router/index')
const app = new koa()

// 静态资源托管
app.use(static(path.join(__dirname,'./public')))

// body解析中间件 获取post参数
app.use(bodyparser())
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))

app.use(router.routes()) // 启动路由
app.use(router.allowedMethods()) 

app.listen(3000, () => {
  console.log('服务启动了 http://127.0.0.1:3000');
})