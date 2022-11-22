# NODE-JS





## fs 文件系统模块



### 什么是 fs 文件系统模块

`fs` 模块是 Node.js 官方提供的、用来操作文件的模块。



​		在 JavaScript 代码中，使用 fs 模块来操作文件，则需要先导入它：

```js
const fs = require('fs')
```



​		fs 提供了一系列的方法和属性，用来满足用户对文件的操作需求。

- `fs.readFile() `方法，用来`读取`指定文件中的内容

  ```js
  fs.readFile(path [, options], callback)
  ```

  ​	参数1：path -- 必选参数，字符串，表示文件的路径。
  ​	参数2：options -- 可选参数，表示以什么编码格式来读取文件。
  ​	参数3：callback -- 必选参数，文件读取完成后，通过回调函数拿到读取的结果。

  

  以 utf8 的编码格式，读取指定文件的内容，并打印 err 和 res 的值：

  ```js
  fs.readFile('./text.txt','utf-8', (err, res)=>{
    // 成功 err 的值为null，    res 正常返回 string
    // 失败 err 的值为错误对象， res 是 undefined
    if (err) return console.log('err',err.message)
    console.log('res', res)
  })
  ```

  

- ` fs.writeFile()` 方法，用来向指定的文件中`写入`内容