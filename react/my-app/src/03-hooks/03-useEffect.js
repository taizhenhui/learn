import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function App() {

  const [list, setList] = useState([])

  // 第一个参数 是回调函数 第二个参数是 数组
  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    axios.get('test.json')
      .then(res => {
        console.log(res.data.data);
        let { films } = res.data.data
        setList(films)
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      {list.map(m =>
        <li key={m.filmId}>{m.name}</li>
      )}
    </div>
  )
}
