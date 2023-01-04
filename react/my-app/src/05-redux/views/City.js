import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import store from '../redux/store'
const initState = {
  list: [
    '北京',
    '上海',
    '深圳',
    '广州'
  ]
}
function City() {
  const [list] = useState(initState.list)
  const history = useHistory()
  const changeCity = (m) => {
    store.dispatch({
      type: 'change-city',
      value: m
    })
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

export default City