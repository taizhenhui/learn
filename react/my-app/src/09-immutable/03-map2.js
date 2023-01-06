import React, { useState } from 'react'
import { Map } from 'immutable'
let obj = {
  name: 'asd',
  select: 'aa',
  filter: {
    text: '123',
    up: true,
    down: false,
  }
}
function App() {
  const [info, setInfo] = useState(Map({
    name: 'asd',
    select: 'aa',
    filter: {
      text: '123',
      up: true,
      down: false,
    }
  }))
  return (
    <div>
      <button onClick={() => {
        setInfo(info.set('name', 'qewr').set('age', 18))
      }}>qewr-18</button>
      <button onClick={() => {
        setInfo(info.set('name', 'ads').set('age', 100))
      }}>ads-100</button>
      <h1>
        {info.get('name')} -- {info.get('age')}
      </h1>
    </div>
  )
}

export default App