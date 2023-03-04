import { SquareGroup } from "../SquareGroup";
import { IGameViewer } from "../types";
import { SquarePageView } from "./SquarePageView";
import $ from 'jquery'
import { Game } from "../Game";
export class GamePageView implements IGameViewer{
  init(game: Game): void {
    throw new Error("Method not implemented.");
  }

  showNext(teris: SquareGroup): void {
    teris.squares.forEach(sq=>{
      sq.viewer = new SquarePageView(sq, $('#next'))
    })
  }

  switch(teris: SquareGroup): void {
    teris.squares.forEach(sq=>{
      sq.viewer?.remove()
      sq.viewer = new SquarePageView(sq, $('#panel'))
    })
  }
  
}