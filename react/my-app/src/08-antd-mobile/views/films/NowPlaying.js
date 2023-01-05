import axios from "axios"
import { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { InfiniteScroll, List, Image } from 'antd-mobile'
import './css/style.css'

export default function NowPlaying(props) {
  const history = useHistory()
  const [list, setlist] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const pageNum = useRef(0)
  // useEffect(() => {
  //   getList(1)
  // }, [])
  const getList = async (type) => {
    let k = type === 1 ? '4740541' : '6470233'
    return await axios({
      url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${pageNum.current}&pageSize=${10}&type=${type}&k=${k}`,
      method: 'GET',
      headers: {
        'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "1670389696259381664940033", "bc": "110100" }',
        'X-Host': 'mall.film-ticket.film.list'
      }
    })
    // let { films: list, total } = res.data.data
    // return {
    //   list,
    //   total
    // }
  }
  const go = (id) => {
    history.push(`/detail/${id}`)
  }

  const loadMore = async () => {
    pageNum.current++
    let { data: { data: { films, total } } } = await getList(1)
    setlist(val => [...val, ...films])
    setHasMore(list.length < total)
  }
  return (
    <div style={{ width: '100%' }}>
      <List style={{ marginTop: '10px', width: '100%' }}>
        {
          list.map(m =>
            <List.Item
           
              key={m.filmId}
              onClick={() => go(m.filmId)}
              prefix={
                <Image
                  src={m.poster}
                  fit='cover'
                  width={70}
                  height={100}
                />
              }
              description={
                <>
                  <div style={{ visibility: m.grade ? '' : 'hidden' }}>观众评分：{m.grade}</div>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>主演：
                    {
                      m.actors.map(f =>
                        <span key={f.name}>{f.name} </span>
                      )
                    }
                  </div>
                  <div>{m.nation} | {m.runtime}分钟</div>
                </>
              }
            >{m.name}</List.Item>
          )
        }
        {!hasMore&& <div style={{width:'100%',textAlign:'center',marginBottom:'10px',fontSize:'14px',color:'#999'}}>没有更多数据了</div>}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}