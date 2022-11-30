module.exports = {
  currentTime(){
    return getTime()
  },
  get timeProp(){
    return getTime()
  } 
}


function getTime() {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :  date.getMonth() + 1
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() 
  let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() 
  let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() 
  let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() 
  let nowTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  return nowTime
}