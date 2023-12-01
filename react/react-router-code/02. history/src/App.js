import React from 'react'
import { BrowserRouter, Route } from './react-router-dom'
function Page1() {
    return <h1>Page1</h1>
}

function Page2() {
    return <h1>Page2</h1>
}


export default function App() {
    return (
        <BrowserRouter>
            <Route path="/page1" component={Page1}></Route>
            <Route path="/page2" component={Page2} />
        </BrowserRouter>
    )
}
