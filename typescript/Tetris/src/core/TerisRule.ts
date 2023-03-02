import GameConfig from "./GameConfig";
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
  static canIMove(shape: Shape, targetPoint: IPoint): boolean {
    // 边界判断
    const targetShape: Shape = shape.map(i => ({ x: i.x + targetPoint.x, y: i.y + targetPoint.y }))
    const result = targetShape.some(s => (
      s.x < 0 || s.x > (GameConfig.panelSize.width - 1) ||
      s.y < 0 || s.y > (GameConfig.panelSize.height - 1)
    ))

    if (result) return false
    return true
  }

  static move(teris: SquareGroup, targetPoint: IPoint): boolean
  static move(teris: SquareGroup, targetDirection: MoveDirection): boolean
  static move(teris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(teris.shape, targetPointOrDirection)) {
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

      return this.move(teris, targetPoint)
    }

  }

  static moveDirection(teris: SquareGroup, targetDirection: MoveDirection) {
    while (this.move(teris, targetDirection)) { }
  }

}

