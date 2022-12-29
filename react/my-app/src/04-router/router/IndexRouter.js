import React, { Component } from 'react'
import { HashRouter as Router, Redirect, Route ,Switch} from 'react-router-dom'
import Films from '../views/Films'
import Cinemas from '../views/Cinemas'
import Center from '../views/Center'
import NotFound from '../views/NotFound'
import Detail from '../views/Detail'
import Detail2 from '../views/Detail2'
import Login from '../views/Login'

function isAuth(){
  return localStorage.getItem('token')
}

export default class IndexRouter extends Component {
  render() {
    return (
      <div>
        <Router>
          {this.props.children}
          <Switch>
            <Route path='/films' component={Films} />
            <Route path='/detail/:id' component={Detail} />
            <Route path='/detail2' component={Detail2} />

            <Route path='/cinemas' component={Cinemas} />
            <Route path='/login' component={Login} />
            {/* <Route path='/center' component={Center} /> */}
            <Route path='/center' render={(props)=> {
              return isAuth() ? <Center {...props} /> : <Redirect to={'/login'} />
            }} />

            {/* 模糊匹配 */}
            <Redirect from='/' to='/films' exact/>

            {/* 精确匹配 exact */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}
