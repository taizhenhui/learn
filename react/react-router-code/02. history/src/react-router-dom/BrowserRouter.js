import React, { Component } from 'react'
import { Router } from '../react-router/index'
import { createBrowserHistory } from './history'
export default class BrowserRouter extends Component {
    history = createBrowserHistory(this.props)
    render() {
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}
