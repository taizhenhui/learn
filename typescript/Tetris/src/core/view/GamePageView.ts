import { SquareGroup } from "../SquareGroup";
import { IGameViewer } from "../types";
import { SquarePageView } from "./SquarePageView";
import $ from 'jquery'
export class GamePageView implements IGameViewer{

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