import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
// import './style/App.css'
import './style/App1.css'
/*
# React动画 - CSSTransition

当进入时，发生：

1. 为CSSTransition内部的DOM根元素（后续统一称之为DOM元素）添加样式enter
2. 在一下帧(enter样式已经完全应用到了元素)，立即为该元素添加样式enter-active
3. 当timeout结束后，去掉之前的样式，添加样式enter-done

当退出时，发生：

1. 为CSSTransition内部的DOM根元素（后续统一称之为DOM元素）添加样式exit
2. 在一下帧(exit样式已经完全应用到了元素)，立即为该元素添加样式exit-active
3. 当timeout结束后，去掉之前的样式，添加样式exit-done

设置classNames属性，可以指定类样式的名称

1. 字符串：为类样式添加前缀
2. 对象：为每个类样式指定具体的名称（非前缀）


关于首次渲染时的类样式，appear、apear-active、apear-done，它和enter的唯一区别在于完成时，会同时加入apear-done和enter-done


还可以与Animate.css联用
*/



// export default function App() {
//     const [visible, setVisible] = useState(false);
//     return (
//         <div>
//             <CSSTransition in={visible} timeout={500} classNames="test">
//                 <h1>一个标题</h1>
//             </CSSTransition>
//             <button onClick={() => setVisible(!visible)}>切换显示状态</button>
//         </div>
//     )
// }


function Comp1({ visible }) {
    return (
        <CSSTransition mountOnEnter in={visible} timeout={1000} >
            <h1 className='title'>组件 1</h1>
        </CSSTransition>
    )
}

function Comp2({ visible }) {
    return (
        <CSSTransition mountOnEnter in={visible} timeout={1000} >
            <h1 className='title'>组件 2</h1>
        </CSSTransition>
    )
}

export default function App() {
    const [showComp1, setShowComp1] = useState(true)
    return (
        <div className='container'>
            <div className='comp-container'>
                <Comp1 visible={showComp1} />
                <Comp2 visible={!showComp1} />
            </div>
            <button onClick={() => setShowComp1(!showComp1)}>切换显示状态</button>
        </div>
    )
}

