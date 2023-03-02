import { Square } from "./Square";
import { IPoint, Shape } from "./types";

/**
 * 组合方块
 */ 
export class SquareGroup {
  private readonly _squares: Square[] = [];

  constructor(private _shape: Shape, private _centerPoint: IPoint, private _color: string) {

    let arr: Square[] = []
    this._shape.forEach(s => {
      const sq = new Square()
      sq.color = this._color
      sq.point = {
        x: this._centerPoint.x + s.x,
        y: this._centerPoint.y + s.y
      }
      arr.push(sq)
    })
    this._squares = arr

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
    this._shape.forEach((s, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + s.x,
        y: this._centerPoint.y + s.y
      }
    })
  }

}