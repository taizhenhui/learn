import React, { useCallback, useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [list, setList] = useState(['a', 'b', 'c'])
  const handleChange = useCallback(
    (e) => {
      setText(e.target.value)
    }, []
  )
  const add = useCallback(
    () => {
      setList([...list, text])
      setText('')
    }, [list, text]
  )
  const del = useCallback(
    (i) => {
      let newList = [...list]
      newList.splice(i, 1)
      setList(newList)
    }, [list]
  )
  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e)} value={text} />
      <button onClick={() => add()}>add</button>
      <div>
        {
          list.map((m, i) =>
            <li key={i}>{m} -- <button onClick={() => del(i)}>del</button></li>
          )
        }
        {!list.length && <span>暂无代办</span>}
      </div>
    </div>
  )
}
