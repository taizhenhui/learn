const express = require('express')

const customModule = require('./customModule')
const app = express()

const mw = (req, res, next) => {
  console.log('最简单的中间件')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mw1 = (req, res, next) => {
  console.log('最简单的中间件11111')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mw2 = (req, res, next) => {
  console.log('最简单的中间件22222')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mwLocal = (req, res, next) => {
  console.log('mwLocal-mwLocal--mwLocal')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mwLocal11 = (req, res, next) => {
  console.log('111112222333-111112222333--111112222333')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
// app.use(express.json())
// app.use(express.urlencoded({extended: false }))
// app.use(BodyParser.urlencoded({extended:false}))
app.use(customModule.customMW)
// 将 mw 注册为全局生效的中间件
// app.use(mw).use(mw1).use(mw2)

app.get('/', mwLocal, mwLocal11, (req, res)=>{
  throw new Error('报错')
  res.send('home page')

})

app.post('/user', (req, res)=>{
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于undefined
  console.log(req.body,'--------');
  res.send(req.body)

})
app.post('/book', (req, res)=>{
  console.log(req.body);
  res.send('book page')

})
// 错误级别中间件
app.use((err, req, res, next)=>{
  console.log(err.message);
  res.send('Error: ' + err.message)
  next()
})

app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
})