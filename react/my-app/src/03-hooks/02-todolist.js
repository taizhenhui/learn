import React, { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [list, setList] = useState(['a', 'b', 'c'])
  const handleChange = (e) => {
    setText(e.target.value)
  }
  const add = () => {
    setList([...list, text])
    setText('')
  }
  const del = (i) => {
    let newList = [...list]
    newList.splice(i,1)
    setList(newList)
  } 
  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e)} value={text} />
      <button onClick={() => add()}>add</button>
      <div>
        {
          list.map((m, i) =>
            <li key={i}>{m} -- <a href="###" onClick={() => del(i)}>del</a></li>
          )
        }
        {!list.length && <span>暂无代办</span>}
      </div>
    </div>
  )
}
