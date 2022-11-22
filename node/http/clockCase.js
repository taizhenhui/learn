const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req, response) => {
  const url = req.url
  let newurl = url == '/' ? path.join(__dirname,'/clock/index.html') : path.join(__dirname, `/clock`, url)

  fs.readFile(newurl, 'utf-8', (err, res) => {
    if(err) return  response.end(`<h1>404 not found!</h1>`)

    response.end(res)
  })
  response.setHeader('Content-Type','text/html; charset=utf-8')
  
}).listen(8080, () => {
  console.log('服务启动成功');
})