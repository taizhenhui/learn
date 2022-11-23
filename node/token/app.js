const express = require('express')

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


// 定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'tai No1 ^_^'

// 允许跨域资源共享
app.use(cors())
// 解析 post 表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))






app.post('/api/login', (req, res) => {
  let {username, password} = req.body
  if(username !== 'admin' ||password !== '000000'){
    return res.send({ status: 400, msg: '登录失败'})
  }
  // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({username}, secretKey, {expiresIn: '30s'})

  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串 
  })
})

// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // 使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})


app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})

app.listen(8080, ()=>{
  console.log('服务启动成功 http://127.0.0.1:8080');
})