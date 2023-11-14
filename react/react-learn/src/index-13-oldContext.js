import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/**
# Context

上下文：Context，表示做某一些事情的环境

React中的上下文特点：

1. 当某个组件创建了上下文后，上下文中的数据，会被所有后代组件共享
2. 如果某个组件依赖了上下文，会导致该组件不再纯粹（外部数据仅来源于属性props）
3. 一般情况下，用于第三方组件（通用组件）

## 旧的API

**创建上下文**

只有类组件才可以创建上下文

1. 给类组件书写静态属性 childContextTypes，使用该属性对上下文中的数据类型进行约束
2. 添加实例方法 getChildContext，该方法返回的对象，即为上下文中的数据，该数据必须满足类型约束，该方法会在每次render之后运行。

**使用上下文中的数据**

要求：如果要使用上下文中的数据，组件必须有一个静态属性 contextTypes，该属性描述了需要获取的上下文中的数据类型

1. 可以在组件的构造函数中，通过第二个参数，获取上下文数据
2. **从组件的context属性中获取**
3. 在函数组件中，通过第二个参数，获取上下文数据

**上下文的数据变化**

上下文中的数据不可以直接变化，最终都是通过状态改变

在上下文中加入一个处理函数，可以用于后代组件更改上下文的数据

 */

// 
const types = {
    a: PropTypes.number,
    b: PropTypes.string.isRequired,
    onChangeA: PropTypes.func
}
class OldContext extends React.Component {
    state = {
        a: 1,
        b: 'javascrpt'
    }
    static childContextTypes = types

    handleChange = (newA) => {
        this.setState({
            a: newA
        })
    }
    getChildContext() {
        console.log('获取上下文中的数据');
        return {
            a: this.state.a,
            b: this.state.b,
            onChangeA: this.handleChange
        }
    }
    render() {
        console.log('render');
        return (
            <>
                <div>
                    <ChildA></ChildA>
                </div>
                <button onClick={() => {
                    this.setState({
                        a: this.state.a + 1
                    })
                }}>a+1</button>
            </>
        )
    }
}

ChildA.contextTypes = {
    a: types.a
}
function ChildA(props, context) {
    console.log('ChildA ==> context', context);
    return (
        <>
            <h1>ChildA:{context.a}</h1>
            <ChildB></ChildB>
        </>
    )
}
class ChildB extends React.Component {
    /**
     * 声明需要使用哪些上下文中的数据
     */
    static contextTypes = {
        a: types.a,
        onChangeA: types.onChangeA
    }
    render() {
        console.log("ChildB ==> context", this.context);
        return (
            <>
                ChildB: {this.context.a}
                <button onClick={() => {
                    let a = this.context.a - 1
                    this.context.onChangeA && this.context.onChangeA(a)
                }}>a减1</button>
            </>
        )
    }
}
const div = (
    <>
        <OldContext />
    </>
)

ReactDOM.render(div, document.getElementById('root'))
