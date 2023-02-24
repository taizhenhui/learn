import React from 'react'
import { ChessType, GameStatus } from '../types/enums'
import { BoardComp } from './BoardComp'
import { GameStatusComp } from './GameStatusComp'

interface IState {
  chesses: ChessType[]
  gameStatus: GameStatus
  nextChess: ChessType.red | ChessType.black
}

class GameComp extends React.Component<{}, IState>{

  state: IState = {
    chesses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }

  componentDidMount(): void {
    this.init()
  }
  /**
   * 初始化数据 
   */
  init = () => {
    const arr: ChessType[] = []
    for (let i = 0; i < 9; i++) {
      arr.push(ChessType.none)
    }
    this.setState({
      chesses: arr,
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }

  /**
   * 处理棋子的点击事件
   * 如果该函数运行，说明：
   * 1.游戏没有结束
   * 2.点击的位置没有棋子
   * @param index 索引 
   */
  handleChessClick = (index: number) => {
    const chesses = [...this.state.chesses]
    const nextChess = this.state.nextChess === ChessType.black ? ChessType.red : ChessType.black
    chesses[index] = this.state.nextChess
    this.setState({
      chesses,
      nextChess,
      gameStatus: this.getStatus(chesses, index)
    })
  }

  getStatus = (chesses: ChessType[], index: number): GameStatus => {
    // 1. 判断是否一方获得胜利
    const horMin = Math.floor(index / 3) * 3
    const verMin = index % 3
    if (
      ((chesses[horMin] === chesses[horMin + 1]) && (chesses[horMin] === chesses[horMin + 2])) ||
      ((chesses[verMin] === chesses[verMin + 3]) && (chesses[verMin] === chesses[verMin + 6])) ||
      ((chesses[0] === chesses[4]) && (chesses[0] === chesses[8]) && (chesses[0] !== ChessType.none)) ||
      ((chesses[2] === chesses[4]) && (chesses[2] === chesses[6]) && (chesses[2] !== ChessType.none))
    ) {
      const gameStatus = chesses[index] === ChessType.red ? GameStatus.redWin : GameStatus.blackWin
      return gameStatus
    }
    // 2. 判断是否平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.equal
    }
    // 3. 游戏继续
    return GameStatus.gaming
  }

  render() {
    const { chesses, gameStatus, nextChess } = this.state


    return (
      <div className='game' style={{ textAlign: 'center' }}>
        <GameStatusComp status={gameStatus} next={nextChess} />
        <BoardComp
          chesses={chesses}
          isGameOver={gameStatus !== GameStatus.gaming}
          onClick={(i) => this.handleChessClick(i)} />

        <button onClick={this.init}>重新开始</button>
      </div>
    )
  }
}



export { GameComp }