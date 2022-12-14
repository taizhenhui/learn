import React, { useState } from 'react'

export default function App() {

  const [name, setName] = useState('tai')
  const [age, setAge] = useState(18)
  console.log(name, setName);
  return (
    <div>
      <button onClick={()=>{
        setName('mou')
        setAge(20)
      }}>click</button>
      app - {name} -{age}
    </div>
  )
}
