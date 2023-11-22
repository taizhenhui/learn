import React from 'react'
import { BrowserRouter as Router, } from 'react-router-dom'
import Link from './BetterLink'

import RootRouter from './RootRouter'



export default function App() {
    return (
        <>
            <Router>
                <nav>
                    <Link to={{name: 'home'}}>首页</Link>
                    <span> | </span>
                    <Link to={{name: 'news'}}>新闻页</Link>
                </nav>
                <div>
                    <RootRouter />
                </div>
            </Router>
        </>
    )
}
