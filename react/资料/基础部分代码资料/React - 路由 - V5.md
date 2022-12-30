# React - 路由 - V5



### 什么是路由？

路由是根据不同的 url 地址展示不同的内容或页面。

React components 到 URL 之间的同步映射关系



### react-router-dom

##### 理解

1. react的一个插件库。
2. 专门用来实现一个SPA应用。 
3. 基于react的项目基本都会用到此库。



##### 安装

```js
npm install react-router-dom@5
```



##### 路由方法导入

```js
import { HashRouter as Router, Redirect, Route ,Switch } from "react-router-dom";
```



##### 路由方法使用

```js
<Router>
  <Switch>
  	<Route path='/films' component={Films} />
    <Route path='/cinemas' component={Cinemas} />
  </Switch>
</Router>
```





### 路由模式

路由有 BrowserRouter 和 HashRouter 两种模式

**二者区别：**

1. 底层原理不一样：
   BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
   HashRouter使用的是URL的哈希值。
2. path表现形式不一样
   BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
   HashRouter的路径包含#,例如：localhost:3000/#/demo/test
3. 刷新后对路由state参数的影响
   BrowserRouter没有任何影响，因为state保存在history对象中。
   HashRouter刷新后会导致路由state参数的丢失！！！
4. 备注：HashRouter可以用于解决一些路径错误相关的问题。









### 路由重定向

一般写在所有路由注册的最下方,当所有路由都无法匹配时,跳转到Redirect指定的路由

```js
<Router>
  <Switch>
  	<Route path='/films' component={Films} />
    <Route path='/cinemas' component={Cinemas} />
      
    <Redirect from='/' to='/films' exact/>
  </Switch>
</Router>
```

**注意：**

1. exact 精确匹配 (Redirect 即使使用了exact, 外面还要嵌套Switch 来用)
2. Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack,这个警告只有在hash 模式会出现。



### 路由嵌套

IndexRouter 路由组件

```js
import React, { Component } from 'react'
import { HashRouter as Router, Redirect, Route ,Switch} from 'react-router-dom'
import Films from '../views/Films'
import Cinemas from '../views/Cinemas'

function isAuth(){
  return localStorage.getItem('token')
}

export default class IndexRouter extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/films' component={Films} />
            <Route path='/cinemas' component={Cinemas} />
            <Redirect from='/' to='/films' exact/>
          </Switch>
        </Router>
      </div>
    )
  }
}

```

Films - 父组件；  NowPlaying - 子组件； Comingsoon- 子组件

```js
import { Redirect, Route, Switch } from "react-router-dom";
import {NavLink} from 'react-router-dom'
import NowPlaying from "./films/NowPlaying";
import Comingsoon from "./films/Comingsoon";
export default function Films() {
  return (
    <div>
      <div style={{width:'100%',height:'200px',background:'red'}}>轮播</div>
      <div>
        <li > <NavLink to='/films/nowPlaying'>正在热映</NavLink> </li>
        <li > <NavLink to='/films/comingsoon'>即将上映</NavLink> </li>
      </div>
 			{/* 注册路由 */}
      <Switch>
        {/* 路由 嵌套路由 */}
        <Route path='/films/nowPlaying' component={NowPlaying} />
        <Route path='/films/comingsoon' component={Comingsoon} />
        <Redirect from="/films" to='/films/nowPlaying'/>
      </Switch>
    </div>
  )
}
```

> **注意:**
>
> 1. 注册子路由时要写上父路由的path值
> 2. 路由的匹配是按照注册路由的顺序进行的









### 路由跳转

##### 声明式

**NavLink**

1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
2. 标签体内容是一个特殊的标签属性
3. 通过this.props.children可以获取标签体内容

```html
<NavLink to="/films" activeClassName="active">films</NavLink>
<NavLink to="/cinemas" activeClassName="active">cinemas</NavLink>
<NavLink to="/center" activeClassName="active">center</NavLink>
```



##### 编程式

```js
this.props.history.push()
this.props.history.replace()
this.props.history.goBack()
this.props.history.goForward()
this.props.history.go()
```

```js
this.props.history.push(`/center`) // 类
props.history.push(`/center`) // 函数

const history = useHistory()
history.push(`/center`) // hooks
```





### 路由传参

1. params传参（不丢数据）

   注册成动态路由

   ```js
   <Route path='/detail/:id' component={Detail} />
   ```

   跳转

   ```js
   props.history.push(`/detail/${id}`)
   ```

   接收

   ```js
   props.match.params.id
   ```

   

2. query传参（刷新丢数据）

   注册成动态路由

   ```js
   <Route path='/detail' component={Detail} />
   ```

   跳转

   ```js
   const history = useHistory()
   history.push({
     pathname: `/detail`,
     query: { id: id }
   })
   ```

   接收

   ```js
   props.location.query.id
   ```

   

3. state传参（刷新丢数据）

   注册成动态路由

   ```js
   <Route path='/detail' component={Detail} />
   ```

   跳转

   ```js
   const history = useHistory()
   history.push({
     pathname: `/detail`,
     state: { id: id }
   })
   ```

   接收

   ```js
   props.location.state.id
   ```

   





### 路由拦截

可以使用 render 属性 对路由进行拦截

```html
<Route path='/center' render={(props)=> {
	return isAuth() ? <Center {...props} /> : <Redirect to={'/login'} />
}} />
```





### withRouter

- 如果想在一般组件使用 路由组件所特有的API 时, 就要借助 withRouter  
- withRouter可以加工一般组件, 让一般组件具备路由组件所特有的API 
- withRouter的返回值是一个新组件

**例子：**

```js
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

 class App extends Component {
    // 回退
    back = () => this.props.history.goBack()
    // 前进
    forward = () => this.props.history.goForward()
    /// go
    go = () => this.props.history.go(2)

    render() {
        return (
            <div className="page-header">
                <button onClick={this.back}>回退</button>
                <button onClick={this.forward}>前进</button>
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}

export default withRouter(App)

```

