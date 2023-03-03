import { Game } from "./core/Game";
import { GamePageView } from "./core/view/GamePageView";
import $ from 'jquery'
let g = new Game(new GamePageView())


$('#pause').on('click', () => {
  g.pause()
})
$('#start').on('click', () => {
  g.start()
})
$('#clockwise').on('click', () => {
  g.controlRotate()
})
$('#left').on('click', () => {
  g.controlLeft()
})
$('#right').on('click', () => {
  g.controlRight()
})
$('#down').on('click', () => {
  g.controlDown()
})

