import { Square } from "./core/Square"
import { IPoint, IViewer } from "./core/types"
import { SquarePageView } from "./core/view/SquarePageView"
import $ from 'jquery'
import { SquareGroup } from "./core/SquareGroup"

const groupArr: IPoint[] = [
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 1 }
]
const group = new SquareGroup(groupArr, { x: 3, y: 2 }, 'red')
group.squares.forEach(sq => {
  sq.viewer = new SquarePageView(sq, $('#root'))
});
// const sq = new Square()


// sq.color = 'red'
// sq.point = {
//   x: 4,
//   y: 0
// }
$('#btnDown').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y + 1
  }
})
$('#btnUp').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y - 1
  }
})
$('#btnLeft').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y
  }
})
$('#btnRight').on('click', () => {
  group.centerPoint = {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y
  }
})

// $('#btnRemove').on('click', () => {
//   sq.viewer?.remove()
// })

// $('#btnAdd').on('click', () => {
//   sq.viewer = new SquarePageView(sq, $('#root'))
// })
