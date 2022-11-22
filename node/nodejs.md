# NODE-JS





## fs 文件系统模块

`fs` 模块是 Node.js 官方提供的、用来操作文件的模块。



#### 导入：

```js
const fs = require('fs')
```





#### fs.readFile() 

> `fs.readFile() `方法，用来`读取`指定文件中的内容



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



#### fs.writeFile()

> ` fs.writeFile()` 方法，用来向指定的文件中`写入`内容



```js
fs.writeFile(path ,data[, options], callback)
```

​	参数1：path -- 必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
​	参数2：data -- 必选参数，表示要写入的内容。
​	参数3：options -- 可选参数，表示以什么格式写入文件内容，默认值是 utf8。
​	参数4：callback -- 必选参数，文件写入完成后的回调函数。



向指定的文件路径中，写入文件内容：

```js
fs.writeFile(`./text.txt`, 'content', err => {
  // 如果文件写入成功，则 err的值 为 null
  // 如果文件写入失败，则 err的值 为 错误对象
  if (err) return console.log('err',err.message)
})
```

> 两个注意点
>
> 1. fs.writeFile() 方法只能用来创建文件，不能用来创建路径
> 2. 重复调用 fs.writeFile() 写入同一个文件，新写入的内容会覆盖之前的旧内容





## path 路径模块

`path` 模块是 Node.js 官方提供的、用来处理路径的模块。



#### 导入：

```js
const path = require('path')
```



#### path.join() 

>  path.join() 方法，用来将多个路径片段拼接成一个完整的路径字符串



```js
path.join([...paths])
```

...paths  <string>  路径片段的序列
返回值:  <string> 

```js
// 注意：../ 会抵消前面的路径
let p = path.join('a','/b/c','../','./d','e','f')
console.log(p) // a\b\d\e\f

path.join(__dirname, '/score.txt')
```

> 注意：凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。不要直接使用 + 进行字符串的拼接。



#### path.basename() 

>  path.basename() 方法，用来从路径字符串中，将文件名解析出来



```js
path.basename(path[, ext])
```

path  <string>  必选参数，表示一个路径的字符串
ext  <string>  可选参数，表示文件扩展名
返回:  <string>  表示路径中的最后一部分

```js
const url = 'a/b/c/index.html'
const url2 = 'a/b/c/tupian.png'
// 获取文件名
let name = path.basename(url)
let name2 = path.basename(url2,'.png')
console.log(name,name2) // index.html  tupian
```



#### path.extname()

> path.extname() 方法，获取路径中的文件扩展名



```js
path.extname(path)
```

path <string>必选参数，表示一个路径的字符串
返回: <string> 返回得到的扩展名字符串

```js
const url = 'a/b/c/index.html'
const url2 = 'a/b/c/tupian.png'
// 获取文件扩展名
let extName = path.extname(url)
let extName2 = path.extname(url2)
console.log(extName, extName2) // .html .png
```







## http 模块

`http` 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。通过 http 模块提供的 http.createServer() 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。



#### 导入：

```js
const http = require('http')
```



#### **创建 web 服务器的基本步骤**

1. 导入 http 模块

   ```js
   const http = require('http')
   ```

2. 创建 web 服务器实例

   ```js
   const server = http.createServer()
   ```

3. 为服务器实例绑定 request 事件，监听客户端的请求

   ```js
   server.on('request',(req, res)=>{
     console.log('Someone visit our web server');
   })
   ```

4. 启动服务器

   ```js
   server.listen(8080, () => {
     console.log('服务启动成功');
   })
   ```

   

#### req 请求对象

> 只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。



如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式：

```js
// req 是请求对象，包含了与客户端相关的数据属性
server.on('request',(req, res)=>{
  const url = req.url
  const method = req.method
  console.log(`url is ${url}, and method is ${method}`)
})
```



#### res 响应对象



在服务器的 request 事件处理函数中，如果想访问与服务器相关的数据或属性，可以使用如下的方式：

```js
// req 是请求对象，包含了与客户端相关的数据属性
server.on('request',(req, res)=>{
  const url = req.url
  const method = req.method
  res.end(`url is ${url}, and method is ${method}`)
})
```



#### 解决中文乱码问题

> 当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：



**res.setHeader('Content-Type', 'text/html; charset=utf-8')**

```js
server.on('request', (req, res) => {
  let content = `<h1>404 NOT Found！</h1>`
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(content)
})
```



## 模块化



#### 模块化的基本概念

`模块化`是指解决一个`复杂问题`时，自顶向下逐层`把系统划分成若干模块的过程`。对于整个系统来说，**模块是可组合、分解和更换的单元**。



#### 现实中的模块

<img src="C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221122101847459.png" alt="image-20221122101847459" style="zoom:50%;" />





#### 编程中的模块化

编程领域中的模块化，就是`遵守固定的规则`，把`一个大文件`拆成 **独立并互相依赖** 的`多个小模块`。



把代码进行模块化拆分的好处：

1. 提高了代码的 **复用性**
2. 提高了代码的 **可维护性**
3. 可以实现 **按需加载**



## Node.js 中的模块化



#### Node.js 中模块的分类

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：

1.  **内置模块**

   > 内置模块是由 Node.js 官方提供的，例如 fs、path、http 等

2.  **自定义模块**

   > 用户创建的每个 .js 文件，都是自定义模块

3.  **第三方模块**

   > 由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载



#### 加载模块

使用强大的 `require()` 方法，可以加载需要的 **内置模块、用户自定义模块、第三方模块** 进行使用。例如：

```js
// 内置模块
const fs = require('fs')

// 自定义模块
const custom = require('./custom.js')

// 第三方模块
const moment = require('moment')
```

> 注意：使用 require() 方法加载其它模块时，会执行被加载模块中的代码。





#### Node.js 中的模块作用域

和`函数作用域`类似，在自定义模块中定义的**变量、方法**等成员，`只能在当前模块内被访问`，这种`模块级别的访问限制`，叫做`模块作用域`。



#### 模块作用域的好处

防止了全局变量污染的问题





#### 向外共享模块作用域中的成员



- ##### module 对象

  > 在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息，打印如下：

  ```js
  Module {
    id: '.',
    path: 'E:\\project\\node\\module',
    exports: {},
    filename: 'E:\\project\\node\\module\\01模块化.js',
    loaded: false,
    children: [],
    paths: [
      'E:\\project\\node\\module\\node_modules',
      'E:\\project\\node\\node_modules',
      'E:\\project\\node_modules',
      'E:\\node_modules'
    ]
  }
  ```

  

- ##### module.exports 对象

  > 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
  > 外界用 **require() 方法**导入自定义模块时，得到的就是 module.exports 所指向的对象。

  

- ##### 共享成员时的注意点

  > 使用 require() 方法导入模块时，导入的结果，***永远以 module.exports 指向的对象为准***。

  

- ##### exports 对象

  > 由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 ***exports*** 对象。默认情况下，***exports 和 module.exports 指向同一个对象***。最终共享的结果，还是以 module.exports 指向的对象为准。

  

- ##### exports 和 module.exports 的使用误区

  > 时刻谨记，require() 模块时，得到的永远是 module.exports 指向的对象：

  

  ![image-20221122104522772](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221122104522772.png)

  > 注意：为了防止混乱，建议大家不要在同一个模块中同时使用 exports 和 module.exports

  



#### Node.js 中的模块化规范

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了`模块的特性`和`各模块之间如何相互依赖`。



**CommonJS 规定：**

1. 每个模块内部，`module` 变量代表当前模块。
2. module 变量是一个对象，它的 exports 属性（即 `module.exports`）`是对外的接口`。
3. 加载某个模块，其实是加载该模块的 module.exports 属性。`require() 方法用于加载模块`。







## 模块的加载机制



#### 优先从缓存中加载

***模块在第一次加载后会被缓存***。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。

> 注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而***提高模块的加载效率***。





#### 内置模块的加载机制

内置模块是由 Node.js 官方提供的模块，***内置模块的加载优先级最高***。

> 例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。



#### 自定义模块的加载机制

使用 require() 加载自定义模块时，必须指定以 ***./*** 或 ***../*** 开头的路径标识符。

> 在加载自定义模块时，如果没有指定 ./ 或 ../ 这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。



在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：

1. 补全 .js 扩展名进行加载
2. 补全 .json 扩展名进行加载
3. 补全 .node 扩展名进行加载
4. 加载失败，终端报错



#### 第三方模块的加载机制

如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块。



**如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。**

例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：

1.  C:\Users\itheima\project\node_modules\tools
2.  C:\Users\itheima\node_modules\tools
3.  C:\Users\node_modules\tools
4.  C:\node_modules\tools



#### 目录作为模块

当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：

1. 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口
2. 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
3. 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：Error: Cannot find module 'xxx'































