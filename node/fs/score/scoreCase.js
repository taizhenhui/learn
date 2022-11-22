const fs = require('fs')
const path = require('path')
// 注意：../ 会抵消前面的路径
let p = path.join('a','/b/c','../','./d','e','f')
console.log('p',p)

let urlBase = '/score.txt' 
let urlOK = '/score-ok.txt' 
fs.readFile(path.join(__dirname, urlBase), 'utf-8', (err, res)=>{
  if(err) {
    return console.log(err.message);
  }
  fs.writeFile(path.join(__dirname, urlOK), handleText(res), err => {
    if (err) {
      return console.log(err.message);
    }
    console.log('成绩处理完成');
  })
})

function handleText(text) {
  let arr = text.split(' ').map( m => m.replace('=', '：'))
  return arr.join('\r\n')
}