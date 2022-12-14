import React, { Component, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import '../01-base/component/style.css'
import BetterScroll from 'better-scroll'

function useGetCinemasList() {
  const [cinemasList, setCinemasList] = useState([])
  useEffect(() => {
    // 请求数据
    getdata()
  }, [])
  const getdata = () => {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5790034',
      method: 'get',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1670389696259381664940033","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      let { data: { cinemas } } = res.data
      setCinemasList(cinemas)
      new BetterScroll('.wrapper')
    }).catch(err => console.log(err))

  }
  return {
    cinemasList
  }
}
function useFilterList(cinemasList, myText) {
  let getCinemasList = useMemo(() =>
    cinemasList.filter(f => f.name.toUpperCase().includes(myText.toUpperCase()) || f.address.toUpperCase().includes(myText.toUpperCase()))
    , [cinemasList, myText]
  )
  return {
    getCinemasList
  }
}


export default function Cinma(props) {
  let styleObj = {
    marginBottom: '10px',
    padding: '10px',
    borderBottom: '1px solid #eee'
  }
  const [myText, setmyText] = useState('')

  const { cinemasList } = useGetCinemasList()

  const { getCinemasList } = useFilterList(cinemasList, myText)

  const handleInput = useMemo(() =>
    (e) => setmyText(e.target.value), []
  )

  return (
    <div>
      <div className='header fl'>
        <input type="text" value={myText} onChange={(e) => handleInput(e)} />
      </div>
      <div style={{ height: '60px' }}></div>
      <div className='wrapper'>
        <div className='content'>
          {
            getCinemasList.map(m =>
              <div key={m.cinemaId} style={styleObj}>
                <p>{m.name}</p>
                <p style={{ color: '#999', marginTop: '5px' }}>{m.address}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}


