# React - hooks

*Hook* 是 `React 16.8` 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。



### useState

**作用**：给函数组件增加 `状态(state)`

```js
const [变量, set变量] = useState(变量初始值);
// 声明一个叫 “count” 的 state 变量
const [count, setCount] = useState(0);
```

1. **参数**：`useState()` 方法里面`唯一`的参数就是初始 state （例子：上述代码↑ 0 ）
2. **返回值**：`useState()` 返回当前 `状态state` 以及 更新 `状态state` 的函数 （例子：上述代码↑ count ,  setCount ）
3. **使用**：可多次声明使用



**官网示例代码：**

```js
 1:  import React, { useState } from 'react'; // 引入
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0); // 声明
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>  // 读取
 9:        <button onClick={() => setCount(count + 1)}> // 更新
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

- 第一行: 引入 `useState` 。

  ```js
  import React, { useState } from 'react'; // 引入
  ```

- 第四行: 调用 `useState`  声明了一个新的 state 变量。

  ```js
  const [count, setCount] = useState(0); // 声明
  ```

- 第八行: 读取。

  ```html
  <p>You clicked {count} times</p> 
  ```

- 第九行: 更新 - 点击按钮后，传递一个新的值给 `setCount`。

  ```html
  <button onClick={() => setCount(count + 1)}> // 更新
  ```





### useEffect

**作用**：*Effect Hook* 可以让你在函数组件中执行副作用操作

> 副作用：数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。

```js
useEffect(() => {
	// 数据获取, 设置订阅, 手动更改DOM 
  return () => {
  // 清楚一些操作
  };
}, [依赖的状态;空数组,表示不依赖])
```

**提示**

> 可以把 `useEffect` Hook 看做 class 的生命周期函数 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

useEffect 和 useLayoutEffect 有什么区别？

调用时机不同

- useLayoutEffect

  > 1. 和原来 componentDidMount & componentDidUpdate 一致
  > 2. 在 react 完成 DOM 更新后马上`同步调用`的代码，会`阻塞页面`渲染。

  

- useEffect

  > 1. useEffect 是会在整个页面渲染完才会调用的代码。
  > 2. 官方建议优先使用 useEffect



**使用：**可多次使用



