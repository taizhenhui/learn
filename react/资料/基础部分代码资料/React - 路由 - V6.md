# React - 路由 - V6



### V6 对比 V5 路由

1. <Route> 特性变更
2. path：与当前页面对应的URL匹配。

3. element：新增，用于决定路由匹配时，渲染哪个组件。代替v5的component和render。

4. <Routes>代替了<Switch>
5. <Outlet></Outlet>让嵌套路由更简单
6. useNavigate代替useHistory

7. 移除了<NavLink/>的 activeClassName 和 activeStyle

8. 钩子useRoutes代替react-router-config

9. 移除了exact 


> 路由官网：https://reactrouter.com/en/v6.3.0/api



### 安装

引入最新的reac-router-dom

```js
npm install react-router-dom@6
						或
npm install react-router-dom
```



### 使用

在index.js中引入，我这里使用的是 BrowserRouter 模式

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);
```



app.js 中配置路由

```js

import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import Tabbar from './components/Tabbar'
import Films from './views/Films'
import Cinemas from './views/Cinemas'
import Center from './views/Center'
import NowPlaying from './views/films/NowPlaying'
import Comingsoon from './views/films/Comingsoon'
import Detail from './views/Detail'
function App() {

  return (
    <div className='container'>
      <Routes>
        <Route path='films' element={<Films />} />

        <Route path='cinemas' element={<Cinemas />} >
          <Route path='nowPlaying' element={<NowPlaying />} />
          <Route path='comingsoon' element={<Comingsoon />} />
          <Route path="" element={<Navigate to="/cinemas/nowplaying" />} />
        </Route>
        <Route path='detail/:id' element={<Detail />} />

        <Route path='center' element={<Center />} />
        {/* 重定向 */}
        <Route path="/" element={<Navigate to="/films" />} />
      </Routes>
      <Tabbar></Tabbar>
    </div>
  );
}

export default App;
```



### 路由重定向

在 v6 中<Navigate /> 替换了 v5 <Redirect />

```js
import { Routes, Route, Navigate } from 'react-router-dom'

<Routes>
  <Route path='films' element={<Films />} />
  <Route path='center' element={<Center />} />
  {/* 重定向 */}
	<Route path="/" element={<Navigate to="/films" />} />
</Routes>

```



### 路由嵌套

需要在父组件中  添加 <Outlet /> 组件 （类似于 <router-view/>）

```html
<Routes>
  <Route path='films' element={<Films />} />
	
  <Route path='cinemas' element={<Cinemas />} >
    <Route path='nowPlaying' element={<NowPlaying />} />
    <Route path='comingsoon' element={<Comingsoon />} />
    <Route path="" element={<Navigate to="/cinemas/nowplaying" />} />
  </Route>
  <Route path='center' element={<Center />} />
</Routes>
```

父组件 - <Cinemas /> 中 添加  <Outlet /> 组件 给子组件 <NowPlaying /> <Comingsoon /> 设置展示区域

```js
import React from 'react'
import { Outlet } from 'react-router-dom'
function Cinemas() {
  return (
    <div>
      <div style={{width:'100%',height:'200px',background:'pink'}}></div>
      <Outlet></Outlet>
    </div>
  )
}


export default Cinemas
```



**index**

```html
<Routes>
  <Route index element={<Film/>}/> 
  <Route path="/film" element={<Film/>}/>
  <Route path="/cinema" element={<Cinema/>}/>
  <Route path="/center" element={<Center/>}/>
</Routes>
```

- index用于嵌套路由，仅匹配父路径时，设置渲染的组件。
- 解决当嵌套路由有多个子路由但本身无法确认默认渲染哪个子路由的时候，可以增加index属性来指定默认路由。





### 路由跳转

##### 声明式

```html
<NavLink to="/films" >films</NavLink>
<NavLink to="/cinemas" >cinemas</NavLink>

<Link to='/' >电影</Link>
<Link to='/cinemas'>影院</Link>
```



##### 编程式(hooks)

```js
const navigate = useNavigate()

navigate('/')
navigate('/cinemas')
navigate(1)
navigate(-1)
```



### 路由传参

##### useParams

```js
// 跳转
navigate(`/detail/${id}`)

// 接收
import { useParams } from 'react-router-dom';
let { id } = useParams()
```



##### useLocation

```js
// 跳转
navigate(`/detail`,{
  state:{id}
})
<Link to="/detail" state={{ id }} />
// 接收
import { useLocation } from 'react-router-dom';
const location = useLocation()
console.log(location.state)
```



##### useSearchParams 

```js
import { useSearchParams } from "react-router-dom";

// 当前路径为 /foo?id=12
function Foo() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("id")); // 12
  setSearchParams({
    name: "foo",
  }); // /foo?name=foo
  return <div>foo</div>;
}
```







### 集中式路由渲染useRoutes

使用 `useRoutes` hook，可以使用一个JS对象而不是Routes组件与Route组件来定义路由。其功能类似于[react-router-config](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/react-router-config)

`useRoutes` 的返回是 React Element，或是 null。

对于传入的配置对象， 其类型定义如下：

```js
interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
}
```



router.js

lazy -- 进行组件懒加载

```js
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Films = lazy(()=>import('../views/Films'))
const Cinemas = lazy(()=>import('../views/Cinemas'))
const Center = lazy(()=>import('../views/Center'))
const Detail = lazy(()=>import('../views/Detail'))
const NowPlaying = lazy(()=>import('../views/films/NowPlaying'))
const Comingsoon = lazy(()=>import('../views/films/Comingsoon'))
const router = [
  {
    path: '/',
    element: <Films />,
    children: []
  },
  {
    path: '/cinemas',
    element: <Cinemas />, // 路由嵌套
    children: [
      {
        path: '',
        element: <Navigate to={'nowPlaying'} />, // 路由重定向
        children: []
      },
      {
        path: 'nowPlaying',
        element: <NowPlaying />,
        children: []
      },
      {
        path: 'comingsoon',
        element: <Comingsoon />,
        children: []
      },
    ]
  },
  {
    path: '/center',
    element: <Center />,
    children: []
  },
  {
    path: '/detail',
    element: <Detail />,
    children: []
  },
]

export default router
```



app.js

```js

import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom';

import Tabbar from './components/Tabbar';
import IndexRouter from './router/IndexRouter';
function App() {
  return (
    <>
      <Suspense fallback={<>loading</>}>
        {useRoutes(IndexRouter)}
        <Tabbar/>
      </Suspense>
    </>
  );
}

export default App;

```







