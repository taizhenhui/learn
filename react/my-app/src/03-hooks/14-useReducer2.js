import React, { useContext,useReducer } from 'react'


const initialState = {
  a: 'a',
  b: 'b'
}
const reducer = (prevState, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'change-a':
      newState.a = action.value
      return newState
    case 'change-b':
      newState.b = action.value
      return newState

    default:
      return prevState
  }

}

const GlobalContext = React.createContext()

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={
      {
        state,
        dispatch
      }
    }>
      <div>
        <Child1 />
        <Child2 />
        <Child3 />
      </div>
    </GlobalContext.Provider>
  )
}
function Child1(porps) {
  const { dispatch } = useContext(GlobalContext)
  return (
    <div style={{ background: 'pink' }}>
      <button onClick={() => {
        dispatch({
          type: 'change-a',
          value: 'aaa'
        })
      }}>改变a</button>
      <button onClick={() => {
        dispatch({
          type: 'change-b',
          value: 'bbb'
        })
      }}>改变b</button>
    </div>
  )
}
function Child2(porps) {
  const { state } = useContext(GlobalContext)
  return (
    <div style={{ background: 'red' }}>
      Child2 - {state.a}
    </div>
  )
}
function Child3(porps) {
  const { state } = useContext(GlobalContext)
  return (
    <div style={{ background: 'yellow' }}>
      Child3 - {state.b}
    </div>
  )
}
