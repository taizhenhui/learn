import React from 'react'
import { ChessType } from '../types/enums'
import { ChessComp } from './ChessComp'
import './BoardComp.css'
interface Iprops {
  chesses: ChessType[]
  isGameOver?: boolean
  onClick?: (index: number) => void
}
const BoardComp: React.FC<Iprops> = (props) => {

  const { chesses, onClick } = props
  const isGameOver = props.isGameOver as boolean // 等同于 props.isGameOver!
  const list = chesses.map((type, i) => <ChessComp key={i} type={type} onClick={() => chessHandler(i)} />)
  const chessHandler = (i: number) => {
    if (onClick && !isGameOver) onClick(i)
  }
  
  return (
    <div className='board'> {list} </div>
  )

}

BoardComp.defaultProps = {
  isGameOver: false,
}

export {
  BoardComp
}