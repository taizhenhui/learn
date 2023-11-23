import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RouteGuard from './RouteGuard'

function Page1() {
    return <h1>Page1</h1>
}

function Page2() {
    return <h1>Page2</h1>
}
let count = 0
export default function App() {
    return (
        
        <Router getUserConfirmation={(msg, callback)=>{
            console.log(`消息：${msg}`);
            callback(true)
        }}>
            <ul>
                <li>
                    <Link to='/page1'>page1</Link>
                </li>
                <li>
                    <Link to='/page2'>page2</Link>
                </li>
            </ul>
            <RouteGuard onChange={(prevLocation, location, action, unLisent)=>{
                count++
                console.log(`日志${count}：从${prevLocation.pathname}页面，进入页面${location.pathname}，进入方式${action}`);
                if(count === 5){
                    unLisent();
                }
            }}>
                <Route path="/page1" component={Page1} />
                <Route path="/page2" component={Page2} />
            </RouteGuard>
        </Router>
    )
}
