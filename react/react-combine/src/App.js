import React from 'react'
import { Provider } from "react-redux"
import store from "./store"
import Counter from './components/Counter'
import StudentSearch from './components/StudentSearch'
export default function App() {
    return (
        <Provider store={store}>
            <Counter abc="123"/>
            <StudentSearch/>
        </Provider>
    )
}


