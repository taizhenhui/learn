import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

export interface IPoint {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  /**
   * 显示
   */
  show(): void;

  /**
   * 移除，不再显示
   */
  remove(): void;
}

export interface IGameViewer {
  /**
   * 显示
   * @param teris 下一个方块对象
   */
  showNext(teris:SquareGroup): void;

  /**
   * @param teris 切换的方块对象
   */
  switch(teris:SquareGroup): void;

  /**
   * 完成页面初始化
   * @param game 游戏对象
   */
  init(game: Game):void

  /**
   * 完成页面初始化
   * @param score 分数
   */
  showScore(score: number):void

  /**
   * 游戏暂停
   */
  onGamePause():void
  /**
   * 游戏开始
   */
  onGameStart():void
  /**
   * 游戏结束
   */
  onGameOver():void

}

/**
 * 形状
 */
export type Shape = IPoint[]

export enum MoveDirection {
  left,
  right,
  down
}

export enum GameStatus {
  /**
   * 未开始
   */ 
  init,
  /**
   * 进行中
   */ 
  playing,
  /**
   * 暂停
   */ 
  pause,
  /**
   * 游戏结束
   */ 
  over,

}