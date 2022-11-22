const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  let content = `<h1>404 NOT Found！</h1>`

  if(url == '/' || url == '/index.html'){
    content = `
    <h1>首页</h1>
    <a href="http://127.0.0.1:8080/about.html">去关于页面</a>
    `
  }else if(url == '/about.html'){
    content = `
    <h1>关于</h1>
    <a href="http://127.0.0.1:8080/">去首页</a>
    `
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(content)
}).listen(8080, () => {
  console.log('启动成功 http://127.0.0.1:8080');
})

// server