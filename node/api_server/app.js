const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use()

app.listen(8088, ()=>{
  console.log('服务启动了 http://127.0.0.1:8088');
})