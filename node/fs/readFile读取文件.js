// 1.导入 fs 模块，用来操作文件
const fs = require('fs')

// 2.调用fs。readFile() 方法读取文件
//    参数1：读取文件路径
//    参数2：读取文件时的编码格式
//    参数3：回调函数，拿到读取失败和成功的结果 err res
fs.readFile('./text.txt','utf-8', (err, res)=>{
  // 失败err的值为错误对象，res是undefined
  // 成功err的值为null，res正常返回string
  console.log('err',err)
  console.log('----')
  console.log('res',res)
})
fs.readFile('./text.txt','utf-8', (err, res)=>{
  if (err) {
    return console.log('err',err.message)
  }
  console.log('res', res)
})
