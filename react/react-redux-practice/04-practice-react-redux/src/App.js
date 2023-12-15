import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Counter from './components/Counter'
import StudentSearch from './components/StudentSearch'
export default function App() {
    return (
        <div>
            <Provider store={store}>
                <Counter asd={123}></Counter>
                <StudentSearch></StudentSearch>
            </Provider>
        </div>
    )
}
