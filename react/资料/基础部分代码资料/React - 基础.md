## React - 基础

用于构建用户界面的 JavaScript 库



### React的特性

| 特点           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| 声明式设计     | React采用声明式范式，可以轻松描述应用                        |
| 高效           | React通过对dom的模拟（虚拟dom），最大限度地减少与dom的交互   |
| 灵活           | React可以与已知的库或框架很好的配合                          |
| JSX            | JSX 是 javascript 语法的扩展                                 |
| 组件           | 通过React构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中 |
| 单向响应数据流 | React实现了 单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。 |



### 创建react项目

#### 安装

1. 全局安装

   ```js
   npm install -g create-react-app
   ```

   创建一个项目

   ```js
   create-react-app your-app
   ```

2. 不想全局安装，可以直接使用npx

   ```js
   npx create-react-app myapp 
   /*
   这个过程实际上会安装三个东西
   react: react的顶级库
   react-dom: 因为react有很多的运行环境，比如app端的react-native, 我们要在web上运行就使用react-dom
   react-scripts: 包含运行和打包react应用程序的所有脚本及配置
   */
   ```



#### 目录

```js
├── README.md 使用方法的文档
├── node_modules 所有的依赖安装的目录
├── package-lock.json 锁定安装时的包的版本号,保证团队的依赖能保证一致。
├── package.json
├── public 静态公共目录
└── src 开发用的源代码目录
```



#### Hello World

```react
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

```react
import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App/App'

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <App />
);
```





### JSX语法

​		JSX是一个 JavaScript 的语法扩展。JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。



要明白JSX的原理，需要先明白如何用 JavaScript 对象来表现一个 DOM 元素的结构?



#### 为什么使用 JSX？

1. 在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息。
2. 更好的数据展示



#### JSX 中嵌入表达式

在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。

比如

- 2 + 2
- user.firstName
- formatName(user)
- 三目运算

```react
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```



#### JSX 也是一个表达式

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。



我们可以将JSX 当做 `变量`、`入参`、`返回值`

```react
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

```

#### JSX 特定属性

你可以通过使用引号，来将属性值指定为字符串字面量

```react
const element = <div tabIndex="0"></div>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式

```react
const element = <img src={user.avatarUrl}></img>;
```

**注意**

> 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
>
> 例如，JSX 里的 `class` 变成了 `className`，而 tabindex 则变为 `tabIndex`。



#### JSX 防止注入攻击

你可以安全地在 JSX 当中插入用户输入内容

```react
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

> React DOM 在渲染所有输入内容之前，默认 会进行 转义 。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了 **字符串** 。这样可以有效地防止 **XSS（cross-site-scripting, 跨站脚本）**攻击



#### JSX 表示对象

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

```react
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```





### 组件

##### 函数组件

定义组件最简单的方式就是编写 JavaScript 函数

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数组件它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。它本质上就是 JavaScript 函数



##### class类组件

你同时还可以使用 ES6 的 class 来定义组件

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

##### 注意

> **注意：** 组件名称必须以大写字母开头。
>
> React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。





### 事件处理

##### 事件介绍

​		采用 on+事件名 的方式来绑定一个事件，原生的事件全是小写onclick , React里的事件是驼峰 onClick ，**React的事件并不是原生事件，而是合成事件**。

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。



传统的 HTML

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```



React 

```react
<button onClick={activateLasers}>
  Activate Lasers
</button>
```



##### 事件handler的写法

1. 直接在render里写行内的箭头函数(不推荐)

   ```react
   <button onClick={() => {
     。。。。。
   } }>Delete Row</button>
   ```

2. 在组件内使用箭头函数定义一个方法(推荐)

   ```react
   deleteRow = () => {}
   ```

   ```react
   <button onClick={this.deleteRow}>Delete Row</button>
   <button onClick={() => this.deleteRow() }>Delete Row</button>
   ```

   

3. 直接在组件内定义一个非箭头函数的方法，然后在render里直接使用 onClick={this.handleClick.bind(this)} (不推荐)

   ```js
   deleteRow(){}
   ```

   ```react
   <button onClick={this.deleteRow.bind(this)}>Delete Row</button>
   ```

   

4. 直接在组件内定义一个非箭头函数的方法，然后在constructor里bind(this)(推荐)

   ```react
   constructor(){
     this.deleteRow = this.deleteRow.bind(this);
   }
   deleteRow(){}
   ```

   ```react
   <button onClick={this.deleteRow}>Delete Row</button>
   ```

   



##### Event **对象**

​		事件handler会被自动传入一个 event 对象，这个对象和普通的浏览器 event 对象所包含的方法和属性都基本一致。不同的是 React中的 event 对象并不是浏览器提供的，而是它自己内部所构建的。它同样具有 event.stopPropagation 、 event.preventDefault 这种常用的方法



##### 向事件处理程序传递参数

 `id` 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```





### State

​		状态就是组件描述某种情况的数据，由组件自己设置和更改，也就是说由组件自己维护，使用状态的目的就是为了在不同的状态下使组件的显示不同



#### 定义 / 使用

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    // 定义
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
      	// 使用
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

```react
class Clock extends React.Component {
  // 定义
  state = {date: new Date()}
}
```

#### 正确地使用 State

1. **不要直接修改 State**

   ```react
   // Wrong
   this.state.comment = 'Hello';
   ```

   而是应该使用 `setState()`

   ```react
   // Correct
   this.setState({comment: 'Hello'});
   ```

2. State 的更新可能是异步的

   出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

   因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

   

   例如，此代码可能会无法更新计数器：

   ```react
   // Wrong
   this.setState({
     counter: this.state.counter + this.props.increment,
   });
   ```

   要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

   ```react
   // Correct
   this.setState((state, props) => ({
     counter: state.counter + props.increment
   }));
   ```

   > setState 处在同步逻辑中，异步更新状态，更新真实DOM
   >
   > setState 处在异步逻辑中，同步更新状态，同步更新真实DOM

   > setState 接收第二个参数，第二个参数是回调函数，状态更新完后就会被触发
   >
   > this.setState( { }, ( ) => { });

   

3. State 的更新会被合并

   当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。 （合并是浅合并）



### Refs

1. **给标签设置** ref="username"

   通过这个获取this.refs.username , ref可以获取到应用的真实dom

2. **给组件设置** ref="username"

   通过这个获取this.refs.username ,ref可以获取到组件对象

3. **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。



**新的写法** 

```react
// 创建 Refs
class MyComponent extends React.Component {
	myRef = React.createRef();
  render() {
    return <div ref={this.myRef} />;
  }
}

// 访问 Refs
const node = this.myRef.current;

```



### Props

​		props 是正常是外部传入的，组件内部也可以通过一些方式来初始化的设置，属性不能被组件自己更

改，但是你可以通过父组件主动重新渲染的方式来传入新的 props

> 总的来说，在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为组件 props 对象的键值。通过箭头函数创建的组件，需要通过函数的参数来接收 props

**使用**

- 在组件上通过key=value 写属性,通过this.props获取属性,这样组件的可复用性提高了。

- 注意在传参数时候，如果写成isShow="true" 那么这是一个字符串 如果写成isShow={true} 这个是布尔值

-  {...对象} 展开赋值

- 默认属性值

  ```react
  *.defaultProps = {
  }
  static defaultProps = {
  myname:"默认的myname",
  myshow:true
  }
  ```

-  prop-types 属性验证

  ```react
  import propTypes from "prop-types";
  *.propTypes={
    name:propTypes.string,
    age:propTypes.number
  }
  static propTypes={
    myname:propTypes.string,
    myshow:propTypes.bool
  }
  ```

  





### 属性 VS 状态

**相似点**：都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

**不同点**：

1.  属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能
3. 属性能在内部设置默认值，状态也可以，设置方式不一样
4. 属性不在组件内部修改，状态要在组件内部修改
5. 属性能设置子组件初始值，状态不可以
6. 属性可以修改子组件的值，状态不可以



​		state 的主要作用是用于组件保存、控制、修改自己的可变状态。 state 在组件内部初始化，可以被

组件自身修改，而外部不能访问也不能修改。你可以认为 state 是一个局部的、只能被组件自身控制

的数据源。 state 中状态可以通过 this.setState 方法进行更新， setState 会导致组件的重新渲

染。	



​		props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参

数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props ，否则组件的 props 永远保持

不变。



> 没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件
>
> （stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有
>
> 状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。





### 条件渲染

​		React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者 条件运算符 去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

- 通过 props 的不同 来返回不同的组件

  ```react
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  ```

- 通过 state 的不同 来展示不同的组件

  ```react
  class LoginControl extends React.Component {
  	state = {isLoggedIn: false}
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {
        button = <LogoutButton />;
      } else {
        button = <LoginButton />;
      }
      return (
        <div>
          {button}
        </div>
      );
    }
  }
  ```

- 与运算符 &&

  ```react
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  ```

  ```react
  render() {
    const count = 0;
    return (
      <div>
        {count && <h1>Messages: {count}</h1>}
      </div>
    );
  }
  ```

- 三目运算符

  渲染一小段文本

  ```react
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
  }
  ```

  渲染组件

  ```react
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn
          ? <LogoutButton onClick={this.handleLogoutClick} />
          : <LoginButton onClick={this.handleLoginClick} />
        }
      </div>
    );
  }
  ```



**阻止组件渲染**

可以让 `render` 方法直接返回 `null`，而不进行任何渲染。







### 列表渲染

可以使用map进行列表渲染

```react
// 数据
const people = [{
    id: 1,
    name: 'Leo',
    age: 35
  }, {
    id: 2,
    name: 'XiaoMing',
    age: 16
}]
// 渲染列表
{
people.map(person =>  
     <dl key={person.id}>
       <dt>{person.name}</dt>
       <dd>age: {person.age}</dd>
     </dl>
 	)
}
```

**key**

```react
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>    {number}
  </li>
);
```

```react
const todoItems = todos.map((todo, index) =>
 	<li key={index}>    
		{todo.text}
  </li>
);
```



### 表单

> 在大多数情况下，我们推荐使用 **受控组件** 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。
>
> 另一种替代方案是使用 **非受控组件** ，这时表单数据将交由 DOM 节点来处理。



##### 非受控组件

React要编写一个非受控组件，可以 使用 ref 来从 DOM 节点中获取表单数据，就是非受控组件。

> 因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。



**默认值**

```react
<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，`<select>` 和 `<textarea>` `<input>`支持 `defaultValue
```







##### 受控组件

渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。







