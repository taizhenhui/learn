const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
  secret:'tai',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('./page'))
app.use(express.urlencoded({ extended: false }))

app.post('/api/login', (req, res) => {
  if(req.body.username !== 'admin' || req.body.password !== '000000'){
    return res.send({ status: 1, msg: '登录失败'})
  }
  req.session.user = req.body  // 用户信息
  req.session.islogin = true   // 用户登录状态
  res.send({ status: 0, msg: '登录成功' })
})

app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.send({
    status:0,
    mag:'退出成功'
  })
})

app.get('/api/username', (req, res) => {
  if(!req.session.islogin){
    return res.send({status:1, msg:'fail'})
  }
  res.send({
    status:0, 
    msg:'success',
    username:req.session.user.username
  })
})

app.listen(8080, ()=>{
  console.log('服务启动成功 http://127.0.0.1:8080');
})