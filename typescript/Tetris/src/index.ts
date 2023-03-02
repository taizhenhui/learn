import { SquarePageView } from "./core/view/SquarePageView"
import $ from 'jquery'
import { createTeris } from "./core/Teris"
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./core/types";

const teris = createTeris({ x: 3, y: 2 })
teris.squares.forEach(sq => {
  sq.viewer = new SquarePageView(sq, $('#root'))
});

$('#btnDown').on('click', () => {
  TerisRule.moveDirection(teris, MoveDirection.down)
})
$('#btnLeft').on('click', () => {
  TerisRule.move(teris, MoveDirection.left)
})
$('#btnRight').on('click', () => {
  TerisRule.move(teris, MoveDirection.right)
})

