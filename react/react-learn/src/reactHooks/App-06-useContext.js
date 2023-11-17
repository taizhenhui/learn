import React, { useContext } from 'react'

const ctx = React.createContext()

function Test() {
    const value = useContext(ctx)
    return (
        <h1>value是 {value}</h1>
    )
}
// function Test() {
//     return (
//         <ctx.Consumer>
//             {val => (<h1>val是{val}</h1>)}
//         </ctx.Consumer>
//     )
// }

export default function App() {
    return (
        <div>
            <ctx.Provider value={"asdf"}>
                <Test />
            </ctx.Provider>
        </div>
    )
}
