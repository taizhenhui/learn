import React, { Component } from 'react'
import ReactDOM from 'react-dom'

/**
# Context

## 新版API

旧版API存在严重的效率问题，并且容易导致滥用

**创建上下文**

上下文是一个独立于组件的对象，该对象通过React.createContext(默认值)创建

返回的是一个包含两个属性的对象

1. Provider属性：生产者。一个组件，该组件会创建一个上下文，该组件有一个value属性，通过该属性，可以为其数据赋值
   1. 同一个Provider，不要用到多个组件中，如果需要在其他组件中使用该数据，应该考虑将数据提升到更高的层次
2. Consumer属性：后续讲解

**使用上下文中的数据**

1. 在类组件中，直接使用this.context获取上下文数据
   1. 要求：必须拥有静态属性 contextType , 应赋值为创建的上下文对象
2. 在函数组件中，需要使用Consumer来获取上下文数据
   1. Consumer是一个组件
   2. 它的子节点，是一个函数（它的props.children需要传递一个函数）


**注意细节**

如果，上下文提供者（Context.Provider）中的value属性发生变化(Object.is比较)，会导致该上下文提供的所有后代元素全部重新渲染，无论该子元素是否有优化（无论shouldComponentUpdate函数返回什么结果）
 */

// 

const ctx = React.createContext()


class NewContext extends Component {
    state = {
        a: 0,
        b: "abc",
        changeA: (newA) => {
            this.setState({
                a: newA
            })
        }
    }
    render() {
        return (
            <ctx.Provider value={this.state}>
                <div>
                    <button onClick={() => {
                        this.setState({
                            a: this.state.a + 1
                        })
                    }}>a + 1</button>
                    <ChildA />
                </div>
            </ctx.Provider>
        )
    }
}
const ctxA = React.createContext()
function ChildA(props) {
    return (
        <ctxA.Provider value={{
            a: 123,
            c: 'java'
        }}>
            <h1>ChildA</h1>
            <p>
                <ctx.Consumer >
                    {value => <>{value.a}, {value.b}</>}
                </ctx.Consumer>
            </p>
            <ChildB />
        </ctxA.Provider>
    )
}

class ChildB extends Component {
    static contextType = ctx
    render() {

        return (
            <ctx.Consumer >
                {value => (
                    <>
                        <h5>来自ctx == ChildB：a: {value.a} -- b: {value.b}</h5>
                        <ctxA.Consumer>
                            {
                                val => (
                                    <h6>来自ctxA == ChildB：a: {val.a} -- c: {val.c}</h6>
                                )
                            }
                        </ctxA.Consumer>
                        <button onClick={() => {
                            let newA = value.a - 1
                            value.changeA && value.changeA(newA)
                        }}>a - 1</button>
                    </>
                )}
            </ctx.Consumer>
        )
    }
}
const div = (
    <>
        <NewContext />
    </>
)

ReactDOM.render(div, document.getElementById('root'))
