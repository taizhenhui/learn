import { Square } from "./core/Square"
import { IViewer } from "./core/types"
import { SquarePageView } from "./core/view/SquarePageView"
import $ from 'jquery'
const sq = new Square()
sq.viewer = new SquarePageView(sq, $('#root'))

sq.color = 'red'
sq.point = {
  x: 4,
  y: 0
}
$('#btnDown').on('click',() => {
  sq.point = {
    x: 4,
    y: sq.point.y + 1
  }
})

$('#btnRemove').on('click',() => {
  sq.viewer?.remove()
})

$('#btnAdd').on('click',() => {
  sq.viewer = new SquarePageView(sq, $('#root'))
})
