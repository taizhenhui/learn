import React from 'react'
import ReactDOM from 'react-dom'
/**

# 事件

在React中，组件的事件，本质上就是一个属性
按照之前React对组件的约定，由于事件本质上是一个属性，因此也需要使用小驼峰命名法

**如果没有特殊处理，在事件处理函数中，this指向undefined**

1. 使用bind函数，绑定this
2. 使用箭头函数

 */
const btn = <button onClick={handleClick}>点击</button>
function handleClick(params) {
    console.log("点击了");
}


ReactDOM.render(btn, document.getElementById('root'))