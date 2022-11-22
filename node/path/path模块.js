const path = require('path')
// 注意：../ 会抵消前面的路径
let p = path.join('a','/b/c','../','./d','e','f')
console.log('p',p)


const url = 'a/b/c/index.html'
const url2 = 'a/b/c/tupian.png'

// 获取文件名
let name = path.basename(url)
let name2 = path.basename(url2,'.png')

// 获取文件扩展名
let extName = path.extname(url)
let extName2 = path.extname(url2)


console.log(name,name2,'name,name2')
console.log(extName, extName2,'extName, extName2');