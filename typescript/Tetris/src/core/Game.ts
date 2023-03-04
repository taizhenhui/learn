import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { GameStatus, IGameViewer, MoveDirection } from "./types";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init
  // 当前玩家操作的方块
  private _curTeris?: SquareGroup
  // 下一个方块
  private _nextTeris: SquareGroup
  // 计时器
  private _timer?: number
  // 自动下落的间隔时间
  private _duration: number = 1000
  // 当前游戏中，已存在的方块
  private _exists: Square[] = []
  // 积分
  private _score:number = 0
  constructor(private _viewer: IGameViewer) {
    this._nextTeris = createTeris({ x: 0, y: 0 })
    this.createNext()
  }

  /**
   * 游戏开始
   */
  start() {

    if (this._gameStatus === GameStatus.playing) return
    if (this._gameStatus === GameStatus.over) {
      // 初始化操作
      this.init()
    }
    this._gameStatus = GameStatus.playing
    // 给当前玩家操作的方块赋值
    if (!this._curTeris) this.switchTeris()

    this.autoDrop()
  }
  private createNext(){
    this._nextTeris = createTeris({ x: 0, y: 0 })
    this._viewer.showNext(this._nextTeris)
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris)
  }
  private init(){
    this._exists.forEach(sq=>sq.viewer?.remove())
    this._exists = []
    this._duration =1000
    this._score = 0
    this._curTeris = undefined
    this.createNext()
  }
  /**
   * 游戏暂停
   */
  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause
      clearInterval(this._timer)
      this._timer = undefined
    }
  }

  controlLeft() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.left, this._exists)
    }
  }
  controlRight() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.right, this._exists)
    }
  }
  controlDown() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.moveDirection(this._curTeris, MoveDirection.down, this._exists)
      // 触底
      this.hitBottom()
    }
  }
  controlRotate() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.rotate(this._curTeris, this._exists)
    }
  }
  /**
   * 切换方块
   */
  private switchTeris() {
    this._curTeris = this._nextTeris
    this._curTeris.squares.forEach(it=>it.viewer?.remove())
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris)
    
    if (!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
      // 游戏结束
      this._gameStatus = GameStatus.over
      clearInterval(this._timer)
      this._timer = undefined
      return
    }
    this.createNext()
    this._viewer.switch(this._curTeris)
  }

  /**
   * 当前方块自由下落
   */
  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) return

    this._timer = setInterval(() => {
      if (this._curTeris) {
        if (!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
          // 触底
          this.hitBottom()
        }
      }
    }, this._duration)
  }

  /**
   * 设置中心点坐标，已达到让该方块出现在区域的中心点上方
   * @param width 
   * @param teris 
   */
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.floor(width / 2) - 2
    const y = 0
    teris.centerPoint = { x, y }
    while (teris.squares.some(s => s.point.y < 0)) {
      TerisRule.move(teris, MoveDirection.down, this._exists)
      teris.centerPoint = {
        x:teris.centerPoint.x,
        y:teris.centerPoint.y + 1
      }
    }
  }

  /**
   * 触底之后的操作
   */
  private hitBottom() {
    // 将当前的俄罗斯方块包含的小方块，加入到已存在的方块数组中。
    let arr = this._curTeris ? this._curTeris.squares : []
    this._exists = [...this._exists, ...arr]
    // 处理移除
    const num = TerisRule.deleteSquares(this._exists)
    // 增加积分
    this.addScore(num)
    // 切换方块
    this.switchTeris()
  }
  private addScore(num:number){
    if(num === 0){
      return
    }
    else if(num === 1){
      this._score += 10
    }
    else if(num === 2){
      this._score += 30
    }
    else if(num === 3){
      this._score += 50
    }
    else if(num === 4){
      this._score += 100
    }
    console.log(this._score);
    
  }
}