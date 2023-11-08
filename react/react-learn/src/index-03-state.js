import React from 'react'
import ReactDOM from 'react-dom'
import Tick from './components/Tick'
/**
  # 组件状态
  组件状态：组件可以自行维护的数据
  组件状态仅在类组件中有效

  状态（state），本质上是类组件的一个属性，是一个对象

  **状态初始化**

  **状态的变化**
  不能直接改变状态：因为React无法监控到状态发生了变化
  必须使用this.setState({})改变状态
  一旦调用了this.setState，会导致当前组件重新渲染

  **组件中的数据**
  1. props：该数据是由组件的使用者传递的数据，所有权不属于组件自身，因此组件无法改变该数组
  2. state：该数组是由组件自身创建的，所有权属于组件自身，因此组件有权改变该数据
 */

let num = 10;
ReactDOM.render(<Tick num={num}/>, document.getElementById('root'))




