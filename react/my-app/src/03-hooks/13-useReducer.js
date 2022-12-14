import React, { useReducer } from 'react'

const reducer = (prevState, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'tai-minus':
      newState.count--
      return newState
    case 'tai-add':
      newState.count++
      return newState

    default:
      return prevState
  }
}
const initialState = {
  count: 0,
  // list:[]
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const minus = () => dispatch({ type: 'tai-minus' })
  const add = () => dispatch({ type: 'tai-add' })

  return (
    <div>
      <button onClick={() => minus()}>-</button>
      <span>{state.count}</span>
      <button onClick={() => add()}>+</button>
    </div>
  )
}





export default App