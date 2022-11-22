const http = require('http')

const server = http.createServer()
// req 是请求对象，包含了与客户端相关的数据属性
server.on('request',(req, res)=>{
  console.log('Someone visit our web server');
  const url = req.url
  const method = req.method
  console.log(`url is ${url}, and method is ${method}`)
  res.end(`url is ${url}, and method is ${method}`)
})

server.listen(8080, () => {
  console.log('服务启动成功');
})