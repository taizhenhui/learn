import { Square } from "./Square";
import { IPoint, Shape } from "./types";

/**
 * 组合方块
 */
export class SquareGroup {
  private readonly _squares: Square[] = [];
  /**
   * 旋转方向是否为顺时针
   */
  protected isClock: boolean = true;
  constructor(private _shape: Shape, private _centerPoint: IPoint, private _color: string) {
    let arr: Square[] = []
    this._shape.forEach(s => {
      const sq = new Square()
      sq.color = this._color
      arr.push(sq)
    })
    this._squares = arr
    this.setSquarePoint()
  }

  public get shape() {
    return this._shape
  }

  public get squares() {
    return this._squares
  }

  public get centerPoint(): IPoint {
    return this._centerPoint
  }

  public set centerPoint(p: IPoint) {
    this._centerPoint = p
    this.setSquarePoint()
  }

  /**
   * 根据中心点坐标，以及形状，设置每一个小方块的坐标 
   */
  private setSquarePoint(){
    this._shape.forEach((s, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + s.x,
        y: this._centerPoint.y + s.y
      }
    })
  }

  afterRotateShape(): Shape {
    let newShape: Shape = this.isClock 
      ? this._shape.map(m => ({ x: -m.y, y: m.x })) 
      : this._shape.map(m => ({ x: m.y, y: -m.x }))

    return newShape
  }

  rotate() {
    this._shape = this.afterRotateShape()
    this.setSquarePoint()
  }
}