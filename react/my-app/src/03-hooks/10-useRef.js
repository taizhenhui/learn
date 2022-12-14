import React, { useCallback, useRef, useState } from 'react'

export default function App() {
  const [list, setList] = useState(['a', 'b', 'c'])
  const mytext = useRef()

  const add = useCallback(
    () => {
      console.log(mytext.current.value);
      let {value} = mytext.current
      setList([...list, value])
      mytext.current.value = ''
    }, [list]
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
      <input type="text" ref={mytext} />
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
