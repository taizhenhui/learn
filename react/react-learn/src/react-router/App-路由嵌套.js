import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

function UserUpdate() {
    return (
        <>
            <h1>修改用户信息</h1>
        </>
    )
}


function UserPay() {
    return <h1>用户充值</h1>
}

function User({match}) {
    console.log(match);
    return (
        <>
            <p>
                <Link to={`${match.url}/update`}>用户信息</Link>
                <span> | </span>
                <Link to={`${match.url}/pay`}>充值</Link>
            </p>
            <h1>User组件固定的区域</h1>
            {/* User组件变化的区域：根据地址的不同发生变化 */}
            <div style={{
                width: 500,
                height: 500,
                background: "lightblue",
                border: "2px solid",
                margin: "0 auto"
            }}>
                <Route path={`${match.url}/update`} component={UserUpdate} />
                <Route path={`${match.url}/pay`} component={UserPay} />
            </div>
        </>
    )
}



export default function App() {
    return (
        <Router>
            <Route path='/user' component={User} />
        </Router>
    )
}
