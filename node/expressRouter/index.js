const express = require('express')

const router = require('./routerModule')

const app = express()

app.use('/api',router)

app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
})