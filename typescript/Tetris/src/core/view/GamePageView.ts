import { SquareGroup } from "../SquareGroup";
import { GameStatus, IGameViewer } from "../types";
import { SquarePageView } from "./SquarePageView";
import $ from 'jquery'
import { Game } from "../Game";
import PageConfig from "./PageConfig";
import GameConfig from "../GameConfig";
export class GamePageView implements IGameViewer {

  private nextDom = $('#next')
  private panelDom = $('#panel')
  private scoreDom = $('#score')
  private msgDom = $('#msg')
  init(game: Game): void {
    this.panelDom.css({
      width: PageConfig.SquareSize.width * GameConfig.panelSize.width,
      height: PageConfig.SquareSize.height * GameConfig.panelSize.height,
    })

    this.nextDom.css({
      width: PageConfig.SquareSize.width * GameConfig.nextSize.width,
      height: PageConfig.SquareSize.height * GameConfig.nextSize.height,
    })
    // 注册键盘事件
    $(document).on('keydown', (e) => {
      console.log(e.key);
      if(e.key === 'ArrowDown'){
        game.controlDown()
      }
      else if(e.key === 'ArrowLeft'){
        game.controlLeft()
      }
      else if(e.key === 'ArrowRight'){
        game.controlRight()
      }
      else if(e.key === 'ArrowUp'){
        game.controlRotate()
      }
      else if(e.key === ' '){
        if(game.gameStatus === GameStatus.playing){
          game.pause()
        }else{
          game.start()
        }
      }
    })
  }
  showScore(score: number): void {
      this.scoreDom.html('积分'+ score.toString())
  }
  showNext(teris: SquareGroup): void {
    teris.squares.forEach(sq => {
      sq.viewer = new SquarePageView(sq, this.nextDom)
    })
  }
  onGamePause(): void {
    this.msgDom.css({
      display:'flex'
    })
    this.msgDom.find('p').html('游戏暂停')
  }
  onGameStart(): void {
    this.msgDom.css({
      display:'none'
    })
    
  }
  onGameOver(): void {
    this.msgDom.css({
      display:'flex'
    })
    this.msgDom.find('p').html('游戏结束')

  }
  switch(teris: SquareGroup): void {
    teris.squares.forEach(sq => {
      sq.viewer?.remove()
      sq.viewer = new SquarePageView(sq, this.panelDom)
    })
  }

}