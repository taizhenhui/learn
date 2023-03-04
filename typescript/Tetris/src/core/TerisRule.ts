import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { IPoint, MoveDirection, Shape } from "./types";


function isPoint(obj: any): obj is IPoint {
  if (typeof obj.x === 'undefined') {
    return false;
  }
  return true
}

export class TerisRule {
  /**
   * 判断某个形状的方块，是否能否移动到目标位置
   */
  static canIMove(shape: Shape, targetPoint: IPoint, exists: Square[]): boolean {
    // 边界判断
    const targetShape: Shape = shape.map(i => ({ x: i.x + targetPoint.x, y: i.y + targetPoint.y }))
    const result = targetShape.some(s => (
      s.x < 0 || (s.x > GameConfig.panelSize.width - 1) ||
      s.y < 0 || (s.y > GameConfig.panelSize.height - 1)
    ))
    if (result) return false
    // 判断是否已有的方块有重叠
    return !targetShape.some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y))
  }

  static move(teris: SquareGroup, targetPoint: IPoint, exists: Square[]): boolean
  static move(teris: SquareGroup, targetDirection: MoveDirection, exists: Square[]): boolean
  static move(teris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection, exists: Square[]): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(teris.shape, targetPointOrDirection, exists)) {
        teris.centerPoint = targetPointOrDirection
        return true
      }
      return false
    } else {
      const direction = targetPointOrDirection
      let targetPoint: IPoint
      if (direction === MoveDirection.down) {
        targetPoint = { x: teris.centerPoint.x, y: teris.centerPoint.y + 1 }
      }
      else if (direction === MoveDirection.left) {
        targetPoint = { x: teris.centerPoint.x - 1, y: teris.centerPoint.y }
      }
      else {
        targetPoint = { x: teris.centerPoint.x + 1, y: teris.centerPoint.y }
      }
      return this.move(teris, targetPoint, exists)
    }

  }

  static moveDirection(teris: SquareGroup, targetDirection: MoveDirection, exists: Square[]) {
    while (this.move(teris, targetDirection, exists)) { }
  }

  static rotate(teris: SquareGroup, exists: Square[]): boolean {
    const newShape = teris.afterRotateShape()
    if (this.canIMove(newShape, teris.centerPoint, exists)) {
      teris.rotate()
      return true
    } else {
      return false
    }
  }

  /**
   * 从已存在的方块中进行消除，并返回消除行数
   * @param exists 
   */
  static deleteSquares(exists: Square[]): number {
    // 得到y坐标的数组
    const ys = exists.map(sq => sq.point.y)
    // 获取最大和最小的y坐标
    const maxY = Math.max(...ys)
    const minY = Math.min(...ys)
    
    let num = 0
    // 循环判断每一行是否可以消除
    for (let y = minY; y <= maxY; y++) {
      if(this.deleteLine(exists, y)) num ++
    }
    return num
  }

  /**
   * 消除一行
   * @param exists 
   * @param y 
   * @returns 
   */
  private static deleteLine(exists: Square[], y: number): boolean {
    const squares = exists.filter(sq => sq.point.y === y)
    if (squares.length === GameConfig.panelSize.width) {
      // 这一行可以移除
      squares.forEach(sq => {
        // 从界面移除
        if (sq.viewer) sq.viewer.remove()
        // 剩下的， y坐标比 当前的y小的方块，y+1
        exists.filter(f => f.point.y < y).forEach(i=>{
          i.point = {
            x: i.point.x,
            y: i.point.y + 1
          }
        })
        const index = exists.indexOf(sq)
        exists.splice(index, 1)
      })
      return true
    }
    return false
  }
}

