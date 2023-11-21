import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import qs from 'query-string'

function A(props) {
    console.log(props);
    const {location} = props;
    const query = qs.parse(location.search);
    const hash = qs.parse(location.hash);
    console.log(query, hash);
    return (
        <>
            <h1>A 组件</h1>
            <p>访问地址： {props.location.pathname}</p>
            <p>查询参数：a:{query.a} - b:{query.b} - c:{query.c}</p>
            <button onClick={() => {
                props.history.push('/b', '给b的状态数据')
            }}>跳转到 B组件</button>
        </>
    )
}
function B(props) {
    return (
        <>
            <h1>B 组件</h1>
            <p>获取状态数据：{props.history.location.state}</p>
            <button onClick={() => {
                props.history.push('/a?a=1&b=2&c=3#qwer')
            }}>跳转到 A组件</button>
        </>
    )
}
export default function App() {

    return (
        <Router>
            <Switch>
                <Route path="/a" component={A}></Route>
                <Route path="/b" component={B}></Route>
            </Switch>
        </Router>
    )
}
