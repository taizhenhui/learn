import React from 'react'
import { ChessType } from '../types/enums'
import './ChessComp.css'
interface Iprops {
  type: ChessType
  onClick?: () => void
}
export const ChessComp: React.FC<Iprops> = (props) => {
  
  const { type, onClick} = props
  let chess = null

  if (type === ChessType.none) {
    chess = <div className='none'></div>
  } else if (type === ChessType.red) {
    chess = <div className='red chess-item'></div>
  } else if (type === ChessType.black) {
    chess = <div className='black chess-item'></div>
  }

  const setChess = () => {
    if(type === ChessType.none && onClick) onClick()
  }

  return (
    <div className='chess' onClick={setChess}>
      {chess}
    </div>
  )
}