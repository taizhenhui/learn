import React, { useRef, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  // useState 记忆函数 ，记住状态
  // let mycount = 0
  // const handleClick = () => {
  //   console.log('111');
  // }
  const mycount = useRef(0)
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
        mycount.current+=2
      }}>click</button>
      {count} -- {mycount.current}
    </div>
  )
}
