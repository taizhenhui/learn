const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')
const { jwtSecretKey } = require('./config')
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const app = express()

app.use((req, res, next)=>{
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use(cors())
app.use(expressJWT({secret:jwtSecretKey}).unless({ path: [/^\/api\//] }))
app.use(express.urlencoded({ extended: false }))
// 路由 api
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
// 错误中间件
app.use((err, req, res, next)=>{
  // if(err instanceof joi.ValidationError) return res.cc(err)
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  res.cc(err)
})
app.listen(8088, ()=>{
  console.log('服务启动了 http://127.0.0.1:8088');
})