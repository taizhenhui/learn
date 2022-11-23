const express = require('express')

const router = express.Router()
const mw = (req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  next()
}

// router.use(mw)
router.get('/get',(req, res) => {
  const query = req.query

  res.send({
    status:0,
    msg:'GET 请求成功',
    data: query
  })
})
router.post('/post',(req, res) => {
  const body = req.body

  res.send({
    status:0,
    msg:'POST 请求成功',
    data: body
  })
})
router.delete('/delete',(req, res) => {
  res.send({
    status:0,
    msg:'delete 请求成功'
  })
})

module.exports = {
  router
}