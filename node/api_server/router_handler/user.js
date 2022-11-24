const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { expiresIn, jwtSecretKey } = require('../config')
// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  let { username, password } = req.body
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, username, (err, results) => {
    if(err) return res.cc(err)
    if(results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
    // 对密码进行加密
    password = bcrypt.hashSync(password, 10)
    // 插入新用户语句
    const sql = 'insert into ev_users set ?'
    db.query(sql, {username, password}, (err, results) => {
      // 执行 SQL 语句失败
      if(err) return res.cc(err)
      // SQL 语句执行成功，但影响行数不为 1
      if(results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      
      res.cc('注册用户成功！', 0)
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  let { username, password } = req.body
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, username, (err, results)=>{
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('登录失败！')
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(password, results[0].password)
    if(!compareResult) return res.cc('登录失败！密码或账号不正确')
    // 生成token
    let user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn })
    res.send({
      status:0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr
    })
  })
}