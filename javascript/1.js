const car = document.querySelector('.car')
const btn = document.querySelector('.btn')
const PLUS_WIDTH = 26
const PLUS_HEIGHT = 30
btn.onclick = function(){
  const div = document.createElement('div')
  div.className = 'plus'
  div.innerHTML = `<i class="egg"></i>`

  const btnRect = btn.getBoundingClientRect()
  const left = btnRect.left + btnRect.width/2 - PLUS_WIDTH/2
  const top = btnRect.top - PLUS_HEIGHT

  const carRect = car.getBoundingClientRect()
  const x = carRect.left + carRect.width/2 - PLUS_WIDTH/2 - left
  const y  = carRect.top - top- PLUS_HEIGHT

  div.style.setProperty('--left', `${left}px`)
  div.style.setProperty('--top', `${top}px`)
  div.style.setProperty('--y', `${y}px`)
  div.style.setProperty('--x', `${x}px`)

  div.addEventListener('animationend', () =>{
    div.remove()
  });
  document.body.appendChild(div)
}
