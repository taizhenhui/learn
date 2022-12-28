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





### useEffect (副作用函数)

**作用**：*Effect Hook* 可以让你在函数组件中执行副作用操作

> 副作用：数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。

```js
useEffect(() => {
	// 数据获取, 设置订阅, 手动更改DOM 
  return () => {
  // 清楚一些操作
  };
}, [依赖的状态;空数组,表示不依赖])

useEffect(() => {
    window.onresize = () => {
      console.log('onresize');
    }
    let timer = setInterval(() => {
      console.log('setInterval');
    }, 1000)

    return () => {
      console.log('组件销毁');
      window.onresize = null
      clearInterval(timer)
    }
  }, [])
```

**提示**

> 可以把 `useEffect` Hook 看做 class 的生命周期函数 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

useEffect 和 useLayoutEffect 有什么区别？

调用时机不同

- useLayoutEffect

  > 1. 和原来 componentDidMount & componentDidUpdate 一致
  > 2. 在 react 完成 DOM 更新后马上`同步调用`的代码，会`阻塞页面`渲染。
  > 3. 避免**页面抖动**，可以把需要操作DOM的代码放在 useLayoutEffect 里。在这里做点dom操作，这些dom修改会和 react 做出的更改一起被一次性渲染到屏幕上，只有一次回流、重绘的代价。

  

- useEffect

  > 1. useEffect 是会在整个页面渲染完才会调用的代码。
  > 2. 官方建议优先使用 useEffect



**使用：**可多次使用





### useCallback (记忆函数)

> 防止因为组件重新渲染，导致方法被重新创建 ，起到缓存作用*;* 只有第二个参数 变化了，才重新声明一次

```js
var handleClick = useCallback(()=>{
	console.log(name)
},[name])
//只有name改变后， 这个函数才会重新声明一次，
//如果传入空数组， 那么就是第一次创建后就被缓存， 如果name后期改变了,拿到的还是老的name。
//如果不传第二个参数，每次都会重新声明一次，拿到的就是最新的name.
```

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。





### useMemo (记忆组件)

> useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。
>
> `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。



**唯一的区别:**

- useCallback   不会执行第一个参数函数，而是将它返回给你
- useMemo  会执行第一个函数并且将 **函数执行结果** 返回给你。



可以把 `useMemo` 作为**性能优化**的手段 ( 类似于VUE中的 计算属性 )

```js
const handleInput = useMemo(() =>
    (e) => {
      setmyText(e.target.value)
    }, []
  )
const getCinemasList = useMemo(() =>
    cinemasList.filter(f => f.name.toUpperCase().includes(myText.toUpperCase()) || f.address.toUpperCase().includes(myText.toUpperCase()))
    , [cinemasList, myText]
  )
```





### useRef (保存引用值)

```js
const refContainer = useRef(initialValue);
```

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。



**例子：**

```js
import React, { useCallback, useRef, useState } from 'react'

export default function App() {
  const [list, setList] = useState(['a', 'b', 'c'])
  const mytext = useRef()  //  --- 声明

  const add = useCallback(
    () => {
      console.log(mytext.current.value);
      let {value} = mytext.current //  --- 访问mytext上的值
      setList([...list, value])
      mytext.current.value = '' //  --- 设置mytext上的值
    }, [list]
  )
  const del = useCallback(
    (i) => {
      let newList = [...list]
      newList.splice(i, 1)
      setList(newList)
    }, [list]
  )
  return (
    <>
      <input type="text" ref={mytext} /> //  --- 使用
      <button onClick={() => add()}>add</button>
      <div>
        {
          list.map((m, i) =>
            <li key={i}>{m} -- <button onClick={() => del(i)}>del</button></li>
          )
        }
        {!list.length && <span>暂无代办</span>}
      </div>
    </>
  )
}
```





### useContext

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。

```js
import React, { useState, useEffect, useContext } from 'react'
const ThemeContext = React.createContext()

const value = useContext(ThemeContext)
```

当前的 context 值由上层组件中距离当前组件最近的 `<ThemeContext.Provider>` 的 `value` prop 决定。

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);  // 默认值

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>    
    // value={themes.dark} 决定 <ThemedButton /> 中的theme
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```



### useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。



**例子：**

```js
import React, { useReducer } from 'react'

const reducer = (prevState, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'tai-minus':
      newState.count--
      return newState
    case 'tai-add':
      newState.count++
      return newState

    default:
      return prevState
  }
}
const initialState = {
  count: 0,
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const minus = () => dispatch({ type: 'tai-minus' })
  const add = () => dispatch({ type: 'tai-add' })

  return (
    <div>
      <button onClick={() => minus()}>-</button>
      <span>{state.count}</span>
      <button onClick={() => add()}>+</button>
    </div>
  )
}
```



##### useReducer 和 useContext 配合使用

```js
import React, { useContext,useReducer } from 'react'


const initialState = {
  a: 'a',
  b: 'b'
}
const reducer = (prevState, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'change-a':
      newState.a = action.value
      return newState
    case 'change-b':
      newState.b = action.value
      return newState

    default:
      return prevState
  }

}

const GlobalContext = React.createContext()

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={
      {
        state,
        dispatch
      }
    }>
      <div>
        <Child1 />
        <Child2 />
        <Child3 />
      </div>
    </GlobalContext.Provider>
  )
}
function Child1(porps) {
  const { dispatch } = useContext(GlobalContext)
  return (
    <div style={{ background: 'pink' }}>
      <button onClick={() => {
        dispatch({
          type: 'change-a',
          value: 'aaa'
        })
      }}>改变a</button>
      <button onClick={() => {
        dispatch({
          type: 'change-b',
          value: 'bbb'
        })
      }}>改变b</button>
    </div>
  )
}
function Child2(porps) {
  const { state } = useContext(GlobalContext)
  return (
    <div style={{ background: 'red' }}>
      Child2 - {state.a}
    </div>
  )
}
function Child3(porps) {
  const { state } = useContext(GlobalContext)
  return (
    <div style={{ background: 'yellow' }}>
      Child3 - {state.b}
    </div>
  )
}

```

