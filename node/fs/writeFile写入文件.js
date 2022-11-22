// 1.导入 fs 模块，用来操作文件
const fs = require('fs')

// 2.调用 fs.writeFile() 方法读取文件
//    参数1：读取文件路径
//    参数2：表示要写入的内容
//    参数3：回调函数，拿到读取失败和成功的结果 err res

const content = ` 
                        《将进酒》
                                --李白

                  君不见，黄河之水天上来，奔流到海不复回。
                  君不见，高堂明镜悲白发，朝如青丝暮成雪。
                  人生得意须尽欢，莫使金樽空对月。
                  天生我材必有用，千金散尽还复来。
                  烹羊宰牛且为乐，会须一饮三百杯。
                  岑夫子，丹丘生，将进酒，杯莫停。
                  与君歌一曲，请君为我倾耳听。
                  钟鼓馔玉不足贵，但愿长醉不愿醒。
                  古来圣贤皆寂寞，惟有饮者留其名。
                  陈王昔时宴平乐，斗酒十千恣欢谑。
                  主人何为言少钱，径须沽取对君酌。
                  五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。
                  `

const url = `./text.txt`
fs.writeFile(url, content, err => {
  // 如果文件写入成功，则 err的值 为 null
  // 如果文件写入失败，则 err的值 为 错误对象
  console.log('写',err);
  if (!err) {
    fs.readFile(url,'utf-8', (err,res)=>{
      console.log('读',err);
      console.log('读',res);
    })
  }else{
    console.log(err.message);
  }
})
