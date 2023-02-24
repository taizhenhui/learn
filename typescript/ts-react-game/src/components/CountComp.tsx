import React from 'react'

interface Iprops {
  num: number
  onChange?: (n: number) => void
}

export const CountComp: React.FC<Iprops> = (props) => {
  const { num, onChange } = props
  console.log(props);

  const decrease = () => {
    if (onChange) onChange(num - 1)
  }
  const increase = () => {
    if (onChange) onChange(num + 1)
  }
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={() => decrease()}>减 -</button>
      <button onClick={() => increase()}>加 +</button>
    </div>
  )
}