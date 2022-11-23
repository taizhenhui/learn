# Express



### Express 简介



#### 什么是 Express

Express 是基于 Node.js 平台，***快速、开放、极简***  的 Web 开发框架。

> 通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，是***专门用来创建 Web 服务器的***。
> Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。



Express 的中文官网： http://www.expressjs.com.cn/





#### Express 能做什么

对于前端程序员来说，最常见的两种服务器，分别是：

- Web 网站服务器：专门对外提供 Web 网页资源的服务器。
- API 接口服务器：专门对外提供 API 接口的服务器。

> 使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。





### Express 的基本使用



#### 安装

在项目所处的目录中，运行如下的终端命令，即可将 express 安装到项目中使用：

```js
npm i express
```



#### 创建基本的 Web 服务器

1. 导入 express

   ```js
   const express = require('express')
   ```

   

2. 创建 web 服务器

   ```js
   const app = express()
   ```

   

3. 调用 app.listen()，启动服务器

   ```js
   app.listen(8080, ()=>{
     console.log('express server running at http://127.0.0.1:8080');
   })
   ```

   



#### 监听 GET 请求

通过 app.get() 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```js
/*
参数1：客服端请求的 url 地址
参数2：请求对应的处理函数
		req：请求对象（包含了与请求相关的属性与方法）
		res：响应对象（包含了与响应相关的属性与方法）
*/
app.get('请求URL', function(req, res){/**处理函数**/})
```



#### 监听 POST 请求

通过 app.post() 方法，可以监听客户端的 POST 请求，具体的语法格式如下：

```js
/*
参数1：客服端请求的 url 地址
参数2：请求对应的处理函数
		req：请求对象（包含了与请求相关的属性与方法）
		res：响应对象（包含了与响应相关的属性与方法）
*/
app.post('请求URL', function(req, res){/**处理函数**/})
```



#### 把内容响应给客户端



通过 ***res.send()*** 方法，可以把处理好的内容，发送给客户端：

```js
app.get('/', (req, res) => {
  res.send({name: 'zs', age: 20, gender: '男'})
})

app.post('/user', (req, res) => {
  res.send('请求成功')
})
```



#### 获取 URL 中携带的查询参数

通过 ***req.query*** 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

```js
app.get('/', (req, res) => {
  console.log(req.query,'req.query');
  res.send(req.query)
})
```



#### 获取 URL 中的动态参数

通过 ***req.params*** 对象，可以访问到 URL 中，通过 `:` 匹配到的动态参数：

```js
app.get('/user/:id', (req, res) => {
  console.log(req.params,'req.query');
  res.send(req.params)
})
// 多个动态参数
app.get('/user/:ids/:name', (req, res) => {
  console.log(req.params,'req.query');
  res.send(req.params)
})
```





### 托管静态资源

#### express.static()

express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器。

例如，通过如下代码就可以将 clock 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static('./clock'))
```

现在，你就可以访问 clock目录中的所有文件了：

- http: //localhost:3000/images/bg.jpg
- http: //localhost:3000/css/style.css
- http: //localhost:3000/js/login.js

> 注意：Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。
> 因此，存放静态文件的目录名不会出现在 URL 中。





#### 托管多个静态资源目录

如果要托管多个静态资源目录，请多次调用 express.static() 函数：

```js
app.use(express.static('./clock'))
app.use(express.static('./files'))
```

> 访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。



#### 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
app.use('/files', express.static('./files'))
```

现在，你就可以通过带有 /files 前缀地址来访问 files 目录中的文件了：

1. http: //localhost:3000/files/images/kitten.jpg
2. http: //localhost:3000/files/css/style.css
3. http: //localhost:3000/files/js/app.js



### nodemon

我们可以使用 nodemon  这个工具，它能够 **监听项目文件的变动** ，当代码被修改后，nodemon 会 **自动帮我们重启项目** ，极大方便了开发和调试。



#### 安装 nodemon

在终端中，运行如下命令，即可将 nodemon 安装为全局可用的工具：

```js
npm i -g nodemon
```



#### 使用 nodemon

使用 nodemon app.js 来启动项目。这样做的好处是：代码被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

```js
node app.js
// 将上面的命令，替换下面的命令
nodemon app.js
```





### Express 路由



#### 路由的概念

广义上来讲，路由就是映射关系。



#### Express 中的路由

在 Express 中，路由指的是 ***客户端的请求*** 与 ***服务器处理函数*** 之间的`映射关系`。

Express 中的路由分 3 部分组成，分别是 ***请求的类型、请求的 URL 地址、处理函数***，格式如下：

```js
app.METHOD(PATH, HANDLER)
```



#### Express 中的路由的例子

```js
app.get('/', (req, res) => {
  res.send({name: 'zs', age: 20, gender: '男'})
})

app.post('/user', (req, res) => {
  res.send('请求成功')
})
```



#### 路由的匹配过程

每当一个请求到达服务器之后，**需要先经过路由的匹配**，只有匹配成功之后，才会调用对应的处理函数。

在匹配时，会按照路由的顺序进行匹配，如果**请求类型**和**请求的 URL** 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。

![image-20221122180158102](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221122180158102.png)





#### 路由的使用

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上，示例代码如下：

```js
app.get('/', (req, res) => {
  res.send({name: 'zs', age: 20, gender: '男'})
})

app.post('/user', (req, res) => {
  res.send('请求成功')
})
```



#### 路由模块化

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。
将路由抽离为单独模块的步骤如下：

1. 创建路由模块对应的 .js 文件
2. 调用 express.Router() 函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用 module.exports 向外共享路由对象
5. 使用 app.use() 函数注册路由模块



```js
// routerModule.js
const express = require('express')
const router = express.Router()

router.get('/user/list', (req, res) => {
  res.send('Get user list')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user')
})

module.exports = router
```

```js
// index.js
const express = require('express')
// 导入路由模块
const router = require('./routerModule')
const app = express()

// 使用 app.use() 注册路由模块
app.use(router)

app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
})
```



#### 路由模块添加前缀

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```js
app.use('/api',router)
```



### Express 中间件

中间件（Middleware ），特指业务流程的中间处理环节。





#### 现实生活中的例子

在处理污水的时候，一般都要经过三个处理环节，从而保证处理过后的废水，达到排放标准。

![image-20221123090027352](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221123090027352.png)

> 处理污水的这三个中间处理环节，就可以叫做中间件。



#### Express 中间件的调用流程

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

<img src="C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221123090146712.png" alt="image-20221123090146712" style="zoom:80%;" />





#### Express 中间件的格式

Express 的中间件，***本质*** 上就是一个 ***function 处理函数***，Express 中间件的格式如下：

![image-20221123090612261](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221123090612261.png)

> 注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。



#### next 函数的作用

***next 函数*** 是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

<img src="C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221123090524979.png" alt="image-20221123090524979" style="zoom:80%;" />





#### 定义中间件函数

可以通过如下的方式，定义一个最简单的中间件函数：

```js
const mw = (req, res, next) => {
  console.log('最简单的中间件')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
```



#### 全局生效的中间件

客户端发起的**任何请求**，到达服务器之后，**都会触发的中间件**，叫做全局生效的中间件。



通过调用 **app.use(中间件函数)**，即可定义一个**全局生效**的中间件，示例代码如下

```js
const mw = (req, res, next) => {
  console.log('最简单的中间件')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
app.use(mw)
```

#### 定义全局中间件的简化形式

```js
app.use((req, res, next) => {
  console.log('最简单的中间件')
  // 把流转关系，转交给下一个中间件或路由
  next()
})
```



#### 中间件的作用

多个中间件之间，**共享同一份 req 和 res**。基于这样的特性，我们可以在**上游**的中间件中，**统一**为 req 或 res 对象添加**自定义**的**属性**或**方法**，供**下游**的中间件或路由进行使用。

<img src="C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221123091320243.png" alt="image-20221123091320243" style="zoom:80%;" />





#### 定义多个全局中间件

可以使用 app.use() **连续定义多个**全局中间件。客户端请求到达服务器之后，会按照中间件**定义的先后顺序**依次进行调用，示例代码如下：

```js
const mw = (req, res, next) => {
  console.log('最简单的中间件')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mw1 = (req, res, next) => {
  console.log('最简单的中间件11111')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mw2 = (req, res, next) => {
  console.log('最简单的中间件22222')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
app.use(mw).use(mw1).use(mw2)
```



#### 局部生效的中间件

**不使用 app.use()** 定义的中间件，叫做**局部生效的中间件**，示例代码如下：

```js
const mwLocal = (req, res, next) => {
  console.log('mwLocal-mwLocal--mwLocal')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
const mwLocal11 = (req, res, next) => {
  console.log('111112222333-111112222333--111112222333')
  // 把流转关系，转交给下一个中间件或路由
  next()
}
app.get('/', mwLocal, mwLocal11, (req, res)=>{
  res.send('home page')
})
app.get('/', [mwLocal, mwLocal11], (req, res)=>{
  res.send('home page')
})
```



#### 了解中间件的5个使用注意事项

1. 一定要在**路由之前**注册中间件
2. 客户端发送过来的请求，**可以连续调用多个**中间件进行处理
3. 执行完中间件的业务代码之后，**不要忘记调用 next() 函数**
4. 为了**防止代码逻辑混乱**，调用 next() 函数后不要再写额外的代码
5. 连续调用多个中间件时，多个中间件之间，**共享** req 和 res 对象





#### 中间件的分类

为了方便大家**理解**和**记忆**中间件的使用，Express 官方把**常见的中间件用法**，分成了 **5 大类**，分别是：

1.  **应用级别**的中间件

   通过 **app.use()** 或 **app.get()** 或 **app.post()** ，**绑定到 app 实例上的中间件**，叫做应用级别的中间件

   ```js
   const mw = (req, res, next) => {
     console.log('最简单的中间件')
     // 把流转关系，转交给下一个中间件或路由
     next()
   }
   app.use(mw)
   ```

2.  **路由级别**的中间件

   绑定到 **express.Router()** 实例上的中间件，叫做路由级别的中间件。

   ```js
   const express = require('express')
   const app = express()
   const router = express.Router()
   router.use((req, res, next)=>{
     console.log('路由级别中间件')
     next()
   })
   app.use('/', router)
   ```

   

3.  **错误级别**的中间件

   错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

   > 错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。

   ```js
   app.get('/', (req, res)=>{
     throw new Error('报错')
   })
   
   // 错误级别中间件
   app.use((err, req, res, next)=>{
     res.send('Error: ' + err.message)
     next()
   })
   ```

   > 注意：错误级别的中间件，必须注册在所有路由之后！

   

4.  **Express 内置**的中间件

   自 Express 4.16.0 版本开始，Express 内置了 **3 个**常用的中间件，极大的提高了 Express 项目的开发效率和体验

   1. ***express.static*** 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
   2. ***express.json*** 解析 JSON 格式的请求体数据（*有兼容性*，仅在 4.16.0+ 版本中可用）
   3. ***express.urlencoded*** 解析 URL-encoded 格式的请求体数据（*有兼容性*，仅在 4.16.0+ 版本中可用）

   ```js
   app.use(express.json())
   app.use(express.urlencoded({ extended: false }))
   app.use(express.static('./clock'))
   ```

   

5.  **第三方**的中间件

   非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。

   例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据

   1. 运行 npm install body-parser 安装中间件
   2. 使用 require 导入中间件
   3. 调用 app.use() 注册并使用中间件

   > 注意：Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。





### Express 写接口



#### 创建基本的服务器

```js
const express = require('express')
const router = require('./routerModule')
const app = express()

app.use('/api',router)

app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
})
```



#### 创建 API 路由模块

```js
const express = require('express')

const router = express.Router()

// 你的路由

module.exports = router
```



#### 编写 GET 接口

```js
router.get('/get', (req, res) => {
  const query = req.query
  res.send({
    status: 0,
    msg: 'GET请求成功'，
    data: query
  })
})
```



#### 编写 POST 接口

```js
router.post('/post', (req, res) => {
  const body = req.body
  res.send({
    status: 0,
    msg: 'GET请求成功'，
    data: body
  })
})
```

> 注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))





### CORS 跨域资源共享



#### 接口的跨域问题

> 刚才编写的 GET 和 POST接口，存在一个很严重的问题：不支持跨域请求。

解决接口跨域问题的方案主要有两种：

1.  ***CORS***（主流的解决方案，推荐使用）
2.  ***JSONP***（有缺陷的解决方案：只支持 GET 请求）



#### cors 中间件解决跨域问题

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

使用步骤分为如下 3 步：

1. 运行 npm install cors **安装中间件**
2. 使用 const cors = require('cors') 导入中间件
3. 在路由之前调用 app.use(cors()) **配置中间件**



#### 什么是 CORS

CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 **HTTP 响应头**组成，**这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源**。

> 浏览器的*同源安全策略*默认会阻止网页“跨域”获取资源。但如果接口服务器**配置了 CORS 相关的 HTTP 响应头**，就可以
>
> **解除浏览器端的跨域访问限制**。

<img src="C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221123095258324.png" alt="image-20221123095258324" style="zoom: 67%;" />



#### CORS 的注意事项

1. CORS 主要在**服务器端**进行配置。客户端浏览器**无须做任何额外的配置**，即可请求开启了 CORS 的接口。
2. CORS 在浏览器中**有兼容性**。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。



#### CORS 响应头部

1. Access-Control-Allow-Origin

   响应头部中可以携带一个 Access-Control-Allow-Origin 字段，其语法如下:

   ```js
   Access-Control-Allow-Origin: <origin> | *
   ```

   其中，origin 参数的值指定了允许访问该资源的外域 URL。

   例如，下面的字段值将只允许来自 http: //itcast.cn 的请求

   ```js
   res.setHeader('Access-Control-Allow-Origin','http: //itcast.cn')
   ```

   如果指定了 Access-Control-Allow-Origin 字段的值为*通配符*  *****，表示允许来自任何域的请求，示例代码如下：

   ```js
   res.setHeader('Access-Control-Allow-Origin','*')
   ```

   

2. Access-Control-Allow-Headers

   默认情况下，CORS **仅**支持**客户端向服务器**发送如下的 **9 个请求头**：

   > Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一)

   如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！

   ```js
   res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Custom-Header')
   ```

   

3. Access-Control-Allow-Methods

   默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。

   如果客户端希望通过 **PUT、DELETE** 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods来**指明实际请求所允许使用的 HTTP 方法**。

   ```js
   // 只允许 GET, POST, HEAD, DELETE 请求方法
   res.setHeader('Access-Control-Allow-Methods','GET, POST, HEAD, DELETE')
   // 允许所有的 http 请求方法
   res.setHeader('Access-Control-Allow-Methods','*')
   ```

   



#### CORS请求的分类

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是：

1. **简单请求**

   同时满足以下两大条件的请求，就属于简单请求：

   1. 请求方式：GET、POST、HEAD 三者之一
   2.  HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

   

2. **预检请求**

   只要符合以下任何一个条件的请求，都需要进行预检请求

   1. 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
   2. 请求头中包含自定义头部字段
   3. 向服务器发送了 application/json 格式的数据

   > 在浏览器与服务器正式通信之前，浏览器会**先发送 OPTION 请求进行预检**，**以获知服务器是否允许该实际请求**，所以这一次的 OPTION 请求称为“预检请求”。**服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。**



**简单请求**和**预检请求**的区别

**简单请求**的特点：客户端与服务器之间 *只会发生一次请求*。
**预检请求**的特点：客户端与服务器之间 *会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求*。





### JSONP 接口



#### JSONP 的概念与特点

**概念**：

浏览器端通过 <script> 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。

**特点**：

1. JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。
2. JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。



#### 实现 JSONP 接口的步骤

1. **获取**客户端发送过来的**回调函数的名字**
2. **得到要**通过 JSONP 形式 **发送给客户端的数据**
3. 根据前两步得到的数据，**拼接出一个函数调用的字符串**
4. 把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行



#### 实现 JSONP 接口的具体代码

```js
app.get('/api/jsonp', (req, res) => {
  const funName = req.query.callback
  const data = {name: 'zs',age: 22}
  const scriptStr = `${funName}(${JSON.stringify(data)})`
  res.send(scriptStr)
})
```













