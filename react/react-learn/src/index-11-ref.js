import ReactDOM from 'react-dom'

import React, { Component } from 'react'
/**
# ref

reference: 引用

场景：希望直接使用dom元素中的某个方法，或者希望直接使用自定义组件中的某个方法

1. ref作用于内置的html组件，得到的将是真实的dom对象
2. ref作用于类组件，得到的将是类的实例
3. ref不能作用于函数组件

ref不再推荐使用字符串赋值，字符串赋值的方式将来可能会被移出

目前，ref推荐使用对象或者是函数

**对象**

通过 React.createRef 函数创建

**函数**

函数的调用时间：

1. componentDidMount的时候会调用该函数
   1. 在componentDidMount事件中可以使用ref
2. 如果ref的值发生了变动（旧的函数被新的函数替代），分别调用旧的函数以及新的函数，时间点出现在componentDidUpdate之前
   1. 旧的函数被调用时，传递null
   2. 新的函数被调用时，传递对象
3. 如果ref所在的组件被卸载，会调用函数

**谨慎使用ref**

能够使用属性和状态进行控制，就不要使用ref。

1. 调用真实的DOM对象中的方法
2. 某个时候需要调用类组件的方法


 */

const txt = React.createRef()
class Comp extends Component {
    constructor(props){
        super(props)
        // this.txt = React.createRef()
    }
    handleClick = () => {
        console.log(123, this);
        // this.refs.txt.focus()
        txt.current.focus()
    }
    render() {
        return (
            <div>
                <input ref={txt} type="text" />
                <A ref="comA" />
                {/* <B ref="B" /> */}
                <button onClick={this.handleClick}>聚焦</button>
            </div>
        )
    }
}
class A extends Component {
    render(){
        return (
            <h1>组件A</h1>
        )
    }
}
function B(porps) {
    return (
        <h1>组件B</h1>
    )
}

const div = (
    <>
        {}
    </>
)

ReactDOM.render(<Comp />, document.getElementById('root'))
