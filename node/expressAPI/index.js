const express = require('express')
const cors = require('cors')
const {router} = require('./router.js')
const app = express()
router.get('/jsonp',(req, res) => {
  const funName = req.query.callback
  const data = {aa: 'zs',bb: 22}
  const scriptStr = `${funName}(${JSON.stringify(data)})`
  res.send(scriptStr)
})
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/api', router)

app.listen(8080, ()=>{
  console.log('启动成功 http://127.0.0.1:8080');
})