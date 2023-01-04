import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
const initState = {
  list: [
    '北京',
    '上海',
    '深圳',
    '广州'
  ]
}
function City(props) {
  const [list] = useState(initState.list)
  const history = useHistory()
  let {change} = props
  const changeCity = (m) => {
    change(m)
    history.go(-1)
  }
  return (
    <div>
      {
        list.map((m, i) => <li key={i} onClick={() => changeCity(m)}>{m}</li>)
      }
    </div>
  )
}

const mapDispatchToProps = {
  change(m) {
    return {
      type: 'change-city',
      value: m
    }
  }
}
export default connect(null, mapDispatchToProps)(City) 