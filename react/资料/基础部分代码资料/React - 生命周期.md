# React - 新生命周期

每个组件都包含“生命周期方法”，**可以使用此[生命周期图谱](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)作为速查表**

### 不常用的生命周期表

<img src="C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221213115420878.png" alt="image-20221213115420878"  />

### 常用的生命周期表

![image-20221213144645001](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221213144645001.png)



### 挂载 - 阶段

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下

1. [**`constructor()`**](https://react.docschina.org/docs/react-component.html#constructor) -- 不常用

   > **如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

   构造函数仅用于以下两种情况

   - 通过给 `this.state` 赋值对象来初始化内部 state
   - 为 `事件处理函数` 绑定实例

   ```js
   constructor(props) {
     super(props);
     // 不要在这里调用 this.setState()
     this.state = { counter: 0 };
     this.handleClick = this.handleClick.bind(this);
   }
   ```

2. [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops) -- 不常用

   [getDerivedStateFromProps()](#getDerivedStateFromProps) 

   

   `getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来`更新 state`，如果返回 null 则不更新任何内容。

   ```js
   static getDerivedStateFromProps(props, state) {
       console.log('getDerivedStateFromProps');
       return {
         type: props.type
       }
     }
   ```

   

3. [**`render()`**](https://react.docschina.org/docs/react-component.html#render) -- 必用

   [render()](#render) 

   `render()` 方法是 class 组件中唯一必须实现的方法。

   `render()` 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

   它只能访问`this.props` 和 `this.state`，DOM输出 和 不允许修改状态

   ```js
   render(){
     return(
       ...
     )
   }
   ```

   

4. [**`componentDidMount()`**](https://react.docschina.org/docs/react-component.html#componentdidmount) -- 常用

   `componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。**依赖于 DOM 节点的初始化 **应该放在这里。如需通过 **网络请求获取数据**，此处是实例化请求的好地方。

   ```js
   componentDidMount() {
       console.log('componentDidMount')
       // 数据请求
       // 订阅函数调用
       // setInterval
       // 基于创建完的dom进行 -- 初始化
   }
   ```

   

**示例代码**

```js
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()

    this.state = { name: 'xiaoming' }
    console.log('constructor');
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    return {}
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  render() {
    console.log('render');
    return (
      <div>{this.state.name}</div>
    )
  }
}

```

**打印结果**

![image-20221213134233519](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221213134233519.png)







### 更新 - 阶段

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下

1. [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops) -- 不常用（新）

   <a id="getDerivedStateFromProps">同上↑（挂载 - 阶段）</a>

   

2. [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate) -- 不常用

   返回值默认为 true。返回 false 会阻止 render 调用。首次渲染 或 使用 `forceUpdate()` 时不会调用该方法。

   此方法仅作为 **性能优化的方式** 而存在。

   ```js
     shouldComponentUpdate(nextProps, nextState) {
       console.log('shouldComponentUpdate');
       // return true  // 可以更新
       // return false  // 阻止更新
       // 老状态: this.state
       // 新状态: nextState
       if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
         return true
       }
       return false
     }
   ```

   

3. [**`render()`**](https://react.docschina.org/docs/react-component.html#render) -- 必用

   <a id="render">同上↑（挂载 - 阶段）</a>

   

4. [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate) -- 不常用（新）

   它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。

   它取代了 `componetWillUpdate` ，触发时间为update发生的时候，在 `render之后` `dom渲染之前` 返回一个值，作为`componentDidUpdate`的第三个参数。

   ```js
   // 例子1 
   	componentDidUpdate(prevProps, prevState, snapshot) {
       console.log('componentDidUpdate', snapshot); // 打印 componentDidUpdate 100
     }
     getSnapshotBeforeUpdate(prevProps, prevState) {
       console.log('getSnapshotBeforeUpdate')
       return 100
     }
   ```

   ```js
   // 例子2 
   	componentDidUpdate(prevProps, prevState, snapshot) {
       this.myref.current.scrollTop = this.myref.current.scrollHeight - snapshot.scrollHeight + snapshot.scrollTop
     }
     getSnapshotBeforeUpdate(prevProps, prevState) {
       let {scrollTop, scrollHeight} = this.myref.current
       return {
         scrollTop, 
         scrollHeight
       }
     }
   ```

   

5. [**`componentDidUpdate()`**](https://react.docschina.org/docs/react-component.html#componentdidupdate) -- 常用

   `componentDidUpdate()` 会在更新后会被立即调用。**首次渲染不会执行此方法**。

   当组件更新后，可以在此处**对 DOM 进行操作**。如果你对更新前后的 props 进行了比较，也可以选择在此处**进行网络请求**。

   ```js
   	componentDidUpdate(prevProps, prevState, snapshot) {
       this.myref.current.scrollTop = this.myref.current.scrollHeight - snapshot.scrollHeight + snapshot.scrollTop
     }
     getSnapshotBeforeUpdate(prevProps, prevState) {
       let {scrollTop, scrollHeight} = this.myref.current
       return {
         scrollTop, 
         scrollHeight
       }
     }
   ```

   

   > 注意
   >
   > 如果 shouldComponentUpdate() 返回值为 false，则不会调用 `componentDidUpdate()`。



**示例代码**

```js
import React, { Component } from 'react'

export default class App extends Component {
  state = { name: 'tai' }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    return {}
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true
  }
  getSnapshotBeforeUpdate(){
    console.log('getSnapshotBeforeUpdate');
    return {}
  }
  componentDidUpdate(prevProps, prevState) { 
    console.log('componentDidUpdate')
  } 
  render() {
    console.log('render');
    return (
      <div>
        <button onClick={() => {
          this.setState({
            name: 'mou'
          })
        }}>click</button>
        {this.state.name}
      </div>
    )
  }
}

```



**打印结果**

![image-20221213145333152](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20221213145333152.png)



### 卸载 - 阶段

当组件从 DOM 中移除时会调用如下方法

1. [**`componentWillUnmount()`**](https://react.docschina.org/docs/react-component.html#componentwillunmount) -- 常用

   `componentWillUnmount()` 会在组件`卸载及销毁之前`直接调用。在此方法中执行必要的`清理操作`，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅，事件绑定等。

   `componentWillUnmount()` 中**不应调用 `setState()`**，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

​	



### 注意:

下述生命周期方法即将过时，在新代码中应该避免使用它们：

- [`UNSAFE_componentWillMount()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillmount) -- 避免使用
- [`UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillupdate) -- 避免使用
- [`UNSAFE_componentWillReceiveProps()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillreceiveprops) -- 避免使用















