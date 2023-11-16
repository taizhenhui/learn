import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import MovablePanel from '../components/MovablePanel'
import ShowMousePoint from '../components/ShowMousePoint'
import MouseListener from '../components/MouseListener'
import withMouseListener from '../components/withMouseListener'
/*
# render props

有时候，某些组件的各种功能及其处理逻辑几乎完全相同，只是显示的界面不一样，建议下面的方式认选其一来解决重复代码的问题（横切关注点）

1. render props
   1. 某个组件，需要某个属性
   2. 该属性是一个函数，函数的返回值用于渲染
   3. 函数的参数会传递为需要的数据
   4. 注意纯组件的属性（尽量避免每次传递的render props的地址不一致）
   5. 通常该属性的名字叫做render
2. HOC
 */

const MovablePanelFunc = (props) => (<div style={{
    width: 100,
    height: 100,
    background: "#008c8c",
    position: "absolute",
    left: props.x - 50,
    top: props.y - 50
}}></div>)

const ShowMousePointFunc = props => (<>鼠标位置 X: {props.x} - Y: {props.y}</>)

const MovablePanelComp = withMouseListener(MovablePanelFunc)
const ShowMousePointComp = withMouseListener(ShowMousePointFunc)

const div = (
    <>
        <MovablePanel />
        <ShowMousePoint />
    </>
)

class Test extends PureComponent {
    renderPoint = (mouse) => <>鼠标位置 X: {mouse.x} - Y: {mouse.y}</>
    renderDiv = mouse => (<div style={{
        width: 100,
        height: 100,
        background: "#008c8c",
        position: "absolute",
        left: mouse.x - 50,
        top: mouse.y - 50
    }}></div>)
    render() {
        return (
            <>
                <MouseListener render={this.renderPoint} />
                <MouseListener render={this.renderDiv} />
            </>
        )
    }
}

class Test2 extends PureComponent {
    render() {
        return (
            <>
                <MovablePanelComp />
                <ShowMousePointComp />
            </>
        )
    }
}


ReactDOM.render(<Test2></Test2>, document.getElementById('root'))
