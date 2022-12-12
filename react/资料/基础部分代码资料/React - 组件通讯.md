# React - 组件通讯





###  父子组件通信方式

传递数据(父传子)与传递方法(子传父)

##### 父传子 

> 父组件通过 属性 向 子组件 传递数据

```react
import React, { Component } from 'react'
// 子组件 通过 props 接收 父组件 传来的数据
class Navbar extends Component {
  render() {
    const { title, leftshow, rightshow } = this.props
    return (
      <div>
        <div className='nav'>
          <span >{leftshow && '<'}</span>
          <p>{title}</p>
          <span>{rightshow && '='}</span>
        </div>
      </div>
    )
  }
}
// 父组件 
export default class App extends Component {
  render() {

    var obj = {
      title:"测试",
      leftshow:false,
      rightshow:true,
    }
    return (
      <div>
        <div>
          <h2>首页</h2>
          <Navbar  leftshow={false} rightshow={true} />
        </div>
        <div>
          <h2>列表</h2>
          <Navbar title='列表'  rightshow={true}/>
        </div>
        <div>
          <h2>我的</h2>
          <Navbar title='我的' />
        </div>
        <Navbar {...obj} />
      </div>
    )
  }
}
```



##### 子传父

> 父组件通过 属性 给子组件传递方法 ，子组件通过 触发 传过来的该方法 向父组件传递数据（该方法携带回来的参数）

```react
import React, { Component } from 'react'

// 子组件
class Field extends Component {
  render() {
    let { label, type, onChangeEvent, value } = this.props
    return (
      <div style={{ padding: '10px 0' }}>
        <label >{label}</label>
        <input type={type} onChange={(e) => onChangeEvent(e)} value={value} />
      </div>
    )
  }
}

// 父组件
export default class App extends Component {
  state = {
    username: 'admin'
  }
  render() {
    let { username } = this.state
    return (
      <div>
        <h1>登录页面</h1>
        <Field label='用户名:' type='text' value={username}  onChangeEvent={(e) => {
          this.setState({
            username: e.target.value
          })
        }} />
      </div>
    )
  }
}
```

##### ref标记

>  ref标记(父组件拿到子组件的引用，从而调用子组件的方法)

```react
import React, { Component } from 'react'
// 子组件
class Field extends Component {
  state = {
    value: ''
  }
  clear = () => {
    this.setState({
      value: ''
    })
  }
  setValue = (value) => {
    this.setState({
      value
    })
  }
  render = () => {
    let { label, type } = this.props
    return (
      <div style={{ padding: '10px 0' }}>
        <label >{label}</label>
        <input type={type} value={this.state.value} onChange={(e) => {
          this.setState({
            value: e.target.value
          })
        }} />
      </div>
    )
  }
}
// 父组件
export default class App extends Component {
  myUname = React.createRef()
  render() {
    return (
      <div>
        <h1>登录页面</h1>
        <Field ref={this.myUname} label='用户名:' type='text' value={'admin'} />

        <button onClick={() => this.login()}>登录</button>
        <button onClick={() => this.reset()}>取消</button>
      </div>
    )
  }
  login = () => {
    console.log(this.myUname.current.state.value);
  }
  reset = () => {
    this.myUname.current.clear()  // 父组件拿到子组件的引用，从而调用子组件的方法
  }
}
```



###  非父子组件通信方式



##### [状态提升](https://react.docschina.org/docs/lifting-state-up.html)(中间人模式)

React中的状态提升概括来说，就是将多个组件需要共享的状态提升到它们最近的父组件上。在父组件上改变这个状态然后通过props分发给子组件

```react
import React, { Component } from 'react'
import FilmItem from './component/FilmItem'
import FilmDetail from './component/FilmDetail'
export default class App extends Component {
  state = {
    films: [],
    info:''
  }
  render() {
    const { films, info } = this.state
    return (
      <div>
        {
          films.map(item=>
            <FilmItem {...item}  key={item.filmId} getDetail={(info)=>this.getDetail(info)}/>
          )
        }
        <FilmDetail info={info}/>
      </div>
    )
  }
  getDetail= (info) => {
    this.setState({
      info
    })
  }
}

```

​		这段代码中的 子组件 FilmItem 和子组件 FilmDetail 都用了 父组件的件 info 这个状态，两个子组件通过公用这个状态来实现通信



##### 发布订阅模式实现

在调度中心中 要有 列表，发布方法，订阅方法等。

- 列表：记录所有订阅的成员（回调函数）
- 订阅方法：将所有订阅成员注册到列表中
- 发布方法：通知列表中所有的成员 触发列表中所有的回调函数

调度中心

```js
// 调度中心
var bus = {
  list: [],
  // 订阅
  subscribe(cb) {
    this.list.push(cb)
  },
  // 发布
  publish(text) {
    // 遍历所有的list， 将回调函数执行
    this.list.forEach((cb) => {
      cb && cb(text)
    })
  }
}

export default bus 

```

子组件 （订阅）

```react
import React, { Component } from 'react'
import '../css/filmDetail.css'
import bus from '../bus'
export default class FilmDetail extends Component {
  constructor() {
    super()

    this.state = {
      text: ''
    }
    // 订阅
    bus.subscribe((text) => {
      this.setState({
        text
      })
    })
  }
  render() {
    return (
      <div className='container1'>
        <span>
          {this.state.text}
        </span>
      </div>
    )
  }
}

```

子组件 （发布）

```react
import React, { Component } from 'react'
import '../css/filmItem.css'
import bus from '../bus'
export default class FilmItem extends Component {
  render() {
    const { poster, name, grade, synopsis, actors, nation, runtime } = this.props
    return (
      <div className='container fl' onClick={() => this.getSynopsis(synopsis)}>
        <div className='l_img'>
          <img src={poster} alt={name} />
        </div>
        <div className='r_info fl-column'>
          <h1 className='fl'>{name} </h1>
          <p className='info_grade'>观众评分 <span>{grade}</span></p>
          <p className='info_actors text_ell'>主演：
            {
              actors.map((m, i) => <span key={i}>{m.name} </span>)
            }</p>
          <p className='info_nation'><span>{nation}</span> | <span>{runtime}分钟</span></p>
        </div>
        <div className='pay_btn'>
          <button>购票</button>
        </div>
      </div>
    )
  }
  getSynopsis = (synopsis) => {
    // 发布
    bus.publish(synopsis)
  }
}
```



##### [context](https://react.docschina.org/docs/context.html )状态树传参

**React.createContext**

```js
const GlobalContext = React.createContext(defaultValue);
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。



**Context.Provider**

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。



Context.Consumer

```html
<GlobalContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</GlobalContext.Consumer>
```

这里，React 组件也可以订阅到 context 变更。这能让你在 函数式组件 中完成订阅 context。

这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 `value` 值等同于往上组件树离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。



```js
import React from 'react'
const GlobalContext = React.createContext()
export default GlobalContext
```

父组件

```react
import React, { Component } from 'react'
import axios from 'axios'
import FilmItem from './component/FilmItemContext'
import FilmDetail from './component/FilmDetailContext'

import GlobalContext from './context'

export default class App extends Component {
  constructor() {
    super()
    this.getData()
    this.state = {
      films: [],
      info:''
    }
  }
  render() {
    const { films,info } = this.state
    return (
      <GlobalContext.Provider value={{
          info: info,
          changeInfo:(value)=>{
            this.setState({
              info: value
            })
          }
        }}>
        <div>
          {films.map(item => <FilmItem {...item} key={item.filmId} />)}
          <FilmDetail />
        </div>
      </GlobalContext.Provider>
    )
  }
  getData = () => {
    axios.get(`/test.json`)
      .then(res => {
        let { films } = res.data.data
        this.setState({
          films
        })
      })
      .catch(err => console.log(err))
  }
  getDetail = (info) => {
    this.setState({
      info
    })
  }
}



```

子组件

```react
import React, { Component } from 'react'
import '../css/filmDetail.css'
import GlobalContext from '../context'
export default class FilmDetail extends Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {
          (value) => {
            return (
              <div className='container1'>
                <span>
                  {value.info}
                </span>
              </div>
            )
          }
        }
      </GlobalContext.Consumer>
    )
  }
}
```

```react
import React, { Component } from 'react'
import '../css/filmItem.css'
import GlobalContext from '../context'
export default class FilmItem extends Component {
  render() {
    const { poster, name, grade, synopsis, actors, nation, runtime, getDetail } = this.props
    return (
      <GlobalContext.Consumer>
        {
          (value) => {
            // console.log(value);
            return (
              <div className='container fl' onClick={ ()=>this.getSynopsis(value,synopsis)}>
                <div className='l_img'>
                  <img src={poster} alt={name} />
                </div>
                <div className='r_info fl-column'>
                  <h1 className='fl'>{name} </h1>
                  <p className='info_grade'>观众评分 <span>{grade}</span></p>
                  <p className='info_actors text_ell'>主演：
                    {
                      actors.map((m, i) => <span key={i}>{m.name} </span>)
                    }</p>
                  <p className='info_nation'><span>{nation}</span> | <span>{runtime}分钟</span></p>
                </div>
                <div className='pay_btn'>
                  <button>购票</button>
                </div>
              </div>
            )
          }
        }
      </GlobalContext.Consumer>

    )
  }
  getSynopsis=(value,info) => {
    value.changeInfo(info)
  }
}

```



context优缺点：

- 优点：跨组件访问数据

- 缺点：react组件树种某个上级组件shouldComponetUpdate 返回false,当context更新时，不

  会引起下级组件更新

