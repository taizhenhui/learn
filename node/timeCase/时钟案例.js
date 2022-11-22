// 导入 fs 模块
const fs = require('fs')

// 导入 path 模块
const path = require('path')

// 定义正则表达式，分别匹配 <style></style> 和 <script></script> 标签

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 调用 fs.readFile() 方法读取文件
fs.readFile(path.join(__dirname,'./index.html'), 'utf-8', (err, res)=>{
  if(err) {
    return console.log('err',err.message)
  }
  resolve(res,'css')
  resolve(res,'js')
  resolve(res,'html')
})

function resolve(htmlStr, type='css') {
  let [r1, newStr] = ['', '']

  if(type=='css'){
    r1 = regStyle.exec(htmlStr)
    newStr = r1[0].replace('<style>', '').replace('</style>', '')

  }else if(type=='js'){
    r1 = regScript.exec(htmlStr)
    newStr = r1[0].replace( '<script>', '').replace('</script>', '')

  }else if(type=='html'){
    newStr = htmlStr
      .replace(regStyle,'<link rel="stylesheet" href="./index.css">')
      .replace(regScript,'<script src="./index.js"></script>')

  }
  fs.writeFile(path.join(__dirname,`./clock/index.${type}`), newStr ,err => {
    if (err) return console.log('err.message',err.message)
    console.log(`${type}写入成功`);
  })
}