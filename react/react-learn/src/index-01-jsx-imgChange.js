import React from 'react'
import ReactDOM from 'react-dom'
import src1 from './assets/1.jpg'
import src2 from './assets/2.jpg'
import src3 from './assets/3.jpg'

const srcs = [src1, src2, src3]
let index = 2
const container = document.getElementById('root')
let timer = null
function start(time){
    stop()
    timer = setInterval(() => {
        index = (index + 1) % 3
        render(index)
    }, time)
}

function stop() {
    clearInterval(timer)
}
function render(i){
    ReactDOM.render(<img src={srcs[i]} alt="" />, container)
}

start(2000)

container.onmouseenter = function(){
    stop()
}
container.onmouseleave = function(){
    start(2000)
}
