import React from 'react'
import { ChessType, GameStatus } from '../types/enums'
import "./GameStatusComp.css"

interface IProps {
  status: GameStatus
  next: ChessType.red | ChessType.black
}

const GameStatusComp: React.FC<IProps> = (props) => {
  let content: JSX.Element;
  const { status, next } = props

  if(status === GameStatus.gaming){
    content = next === ChessType.red ? <div className='next red'> 红方落子 </div> : <div className='next black'> 黑方落子 </div> 
  }else{
    if(status === GameStatus.redWin){
      content = <div className='win red'>红方胜利</div>
    }
    else if(status === GameStatus.blackWin){
      content = <div className='win black'>黑方胜利</div>
    }
    else {
      content = <div className='win equal'>平局</div>
    }
  }

  return (
    <div className='status'>
      {content}
    </div>
  )
}

export { GameStatusComp }