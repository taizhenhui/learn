import React from 'react'
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Personal from './Personal'
import ProtectedRoute from './ProtectedRoute'
export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <span> | </span>
                    <li><Link to='/login'>登录</Link></li>
                    <span> | </span>
                    <li><Link to='/personal'>个人中心</Link></li>

                </ul>
                <div>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <ProtectedRoute path='/personal' component={Personal} />
                        <Route path='/' component={Home} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
