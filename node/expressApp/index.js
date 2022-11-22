const express = require('express')

const app = express()

app.get('/', (req, res) => {
  
  console.log(req.query,'req.query');

  res.send(req.query)

})
app.get('/user', (req, res) => {

  res.send({name: 'zs', age: 20, gender: '男'})

})
app.get('/user/:id', (req, res) => {

  console.log(req.params,'req.query');

  res.send(req.params)

})
app.get('/user/:ids/:name', (req, res) => {

  console.log(req.params,'req.query');

  res.send(req.params)

})

app.post('/user', (req, res) => {

  res.send('请求成功')

})


// app.use(express.static('./clock'))
app.use('/files', express.static('./files'))
app.use(express.static('./clock'))


app.listen(8080, ()=>{
  console.log('express server running at http://127.0.0.1:8080');
})