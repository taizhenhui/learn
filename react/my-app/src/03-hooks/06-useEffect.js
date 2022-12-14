import React, { useEffect, useState } from 'react'

export default function App() {
  const [isCreate, setisCreate] = useState(true)
  return (
    <div>
      <button onClick={() => {
        setisCreate(!isCreate)
      }}>click</button>
      {isCreate && <Child></Child>}
    </div>
  )
}

function Child(props) {
  useEffect(() => {
    window.onresize = () => {
      console.log('onresize');
    }
    let timer = setInterval(() => {
      console.log('setInterval');
    }, 1000)

    return () => {
      console.log('组件销毁');
      window.onresize = null
      clearInterval(timer)
    }
  }, [])
  // 支持写多个
  useEffect(() => {

  }, [])
  return (
    <div>
      Child
    </div>
  )
}