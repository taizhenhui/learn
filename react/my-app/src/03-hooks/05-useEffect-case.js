import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function App() {
  const [type, settype] = useState(1)
  const switchType = (type) => {
    settype(type)
  }
  return (
    <div>
      <ul>
        <li onClick={() => switchType(1)}>正在热映</li>
        <li onClick={() => switchType(2)}>即将上映</li>
      </ul>
      <FilmList type={type}></FilmList>
    </div>
  )

}

function FilmList(props) {
  const [list, setlist] = useState([])
  useEffect(() => {
    getList(props.type)
  }, [props.type])
  const getList = (type) => {
    let k = type === 1 ? '4740541' : '6470233'
    axios({
      url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=${type}&k=${k}`,
      method: 'GET',
      headers: {
        'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "1670389696259381664940033", "bc": "110100" }',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      let { films: list } = res.data.data
      setlist(list)
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div>
      <div>
        {
          list.map(m =>
            <li key={m.filmId}>{m.name}</li>
          )
        }
      </div>
    </div>
  )
}

