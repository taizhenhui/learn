import React from 'react';
import Counter from './Counter';
import Home from './Home';
import { routerRedux, NavLink, Route, Switch } from 'dva/router'
console.log(routerRedux);
export default function ({ history }) {
    return (
        <routerRedux.ConnectedRouter history={history}>
            <div>
                <ul>
                    <li>
                        <NavLink to="/">首页</NavLink>
                    </li>
                    <li>
                        <NavLink to="/counter">计数器</NavLink>
                    </li>
                </ul>

                <div>
                    <Switch>
                        <Route path="/counter" component={Counter} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>

            </div>
        </routerRedux.ConnectedRouter>
    )
}