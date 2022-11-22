
function customMW(req ,res, next){
  let str = ''
  req.on('data', chunk => {
    str += chunk
  })
  req.on('end', () => {
    const body = new URLSearchParams(str)
    req.body = Object.fromEntries(body)
    next()
  })
}

module.exports = {
  customMW
}
