import React from 'react'
import ReactDOM from 'react-dom'

/**
    # Ref转发
    forwardRef
    forwardRef方法：

    1. 参数，传递的是函数组件，不能是类组件，并且，函数组件需要有第二个参数来得到ref
    2. 返回值，返回一个新的组件
 */

function withLoginLog(Comp) {
    class HocLogin extends React.Component {
        componentDidMount() {
            console.log(`日志：组件${Comp.name}被创建了！${Date.now()}`);
        }
        componentWillUnmount() {
            console.log(`日志：组件${Comp.name}被销毁了！${Date.now()}`);
        }
        render() {
            const { forwardRef, ...rest } = this.props
            return (
                <>
                    <Comp {...rest} ref={forwardRef} />
                </>
            )
        }
    }
    return React.forwardRef((props, ref) => {
        console.log(ref,'--------');
        return <HocLogin {...props} forwardRef={ref} />
    })
}
class Login extends React.Component {
    render() {
        return (
            <h1>Login</h1>
        )
    }
}
let LoginComp = withLoginLog(Login)

class Test extends React.Component {
    LoginRef = React.createRef()
    componentDidMount() {
        console.log(this.LoginRef);
    }
    render() {
        return (
            <>
                <LoginComp ref={this.LoginRef} />
            </>
        )
    }
}



ReactDOM.render(<Test />, document.getElementById('root'))
