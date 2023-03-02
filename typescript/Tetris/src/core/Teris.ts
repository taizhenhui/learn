import { SquareGroup } from "./SquareGroup";
import { IPoint, Shape } from "./types";
import { getRandom } from "./utils";
export class TShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color);
  }
  // rotate(): void {}
}

export class LShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color);
  }
  // rotate(): void {}
}

export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }], _centerPoint, _color);
  }
  // rotate(): void {}
}

export class SShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], _centerPoint, _color);
  }
  // rotate(): void {}
}

export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color);
  }
  // rotate(): void {}
}

export class SquareShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color);
  }
  // rotate(): void {}
}

export class LineShape extends SquareGroup {
  constructor(_centerPoint:IPoint, _color:string) {
    super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, _color);
  }
  // rotate(): void {}
}


export const subclasses = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape
]

export const colors = [
  'red',
  '#fff',
  'green',
  'blue',
  'orange'
]
/**
 * 随机产生一个俄罗斯方块 （颜色随机、形状随机）
 * @param centerPoint   
 */
export function createTeris(centerPoint: IPoint) {
  let index = getRandom(0, subclasses.length)
  const Subclass = subclasses[index]

  index = getRandom(0, colors.length)
  const color = colors[index]

  return new Subclass(centerPoint, color)
}

