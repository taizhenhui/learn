import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import getCinemaListAction from "../redux/actionCreator/getCinemaListAction"
import store from "../redux/store"
import '../../01-base/component/style.css'
export default function Cinemas() {
  const [cityName, setCityName] = useState('')
  const [list, setList] = useState([])
  let styleObj = {
    marginBottom: '10px',
    padding: '10px',
    borderBottom: '1px solid #eee'
  }
  useEffect(() => {
    let { cityName } = store.getState().CityReducer
    setCityName(cityName)
  }, [])
  useEffect(() => {
    let { list } = store.getState().CinemaListReducer
    if (list.length === 0) {
      // 取后台数据
      // actionCreator 里写异步
      store.dispatch(getCinemaListAction())
    } else {
      setList(list)
    }
    let unsubscribe = store.subscribe(() => {
      setList(store.getState().CinemaListReducer.list)
    })
    return () => {
      // 取消订阅
      unsubscribe()
    }
  }, [])
  const history = useHistory()
  const changeCity = () => {
    history.push('/city')
  }
  const search = () => {
    history.push('/cinemas/search')
  }
  return (
    <div>
      <div className='header fl'>
        <h4 onClick={() => changeCity()} style={{float:'left'}}>{cityName}</h4>
        <h4 onClick={() => search()} style={{float:'right',fontWeight:'500'}}>{'搜索'}</h4>
      </div>
      <div style={{ height: '60px' }}></div>
      <div className=''>
        <div className='content'>
          {
            list.map(m =>
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