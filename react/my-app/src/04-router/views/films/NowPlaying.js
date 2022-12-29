import { useEffect, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
export default function NowPlaying(props) {
  const [list, setlist] = useState([])
  const history = useHistory()
  useEffect(() => {
    getList(1)
  }, [])
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
  const go = (id) => {
    // props.history.push(`/detail/${id}`)
    history.push(`/detail/${id}`)
  }
  return (
    <div>
      {
        list.map(m =>
          <li key={m.filmId} onClick={() => go(m.filmId)}>{m.name}</li>
        )
      }
    </div>
  )
}