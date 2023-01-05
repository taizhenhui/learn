import { useEffect, } from "react"
import { useHistory } from "react-router-dom"
import getCinemaListAction from "../redux/actionCreator/getCinemaListAction"
import '../../01-base/component/style.css'
import { connect } from 'react-redux'
import { NavBar, Space, Toast } from 'antd-mobile'
let styleObj = {
  marginBottom: '10px',
  padding: '10px',
  borderBottom: '1px solid #eee'
}
function Cinemas(props) {
  const history = useHistory()
  
  let { cityName, list, getCinemaListAction } = props

  useEffect(() => { if (list.length === 0) getCinemaListAction() }, [list, getCinemaListAction])

  const changeCity = () => history.push('/city')

  const search = () => history.push('/cinemas/search')

  const right = (
    <div style={{ fontSize: 15 }}>
      <Space style={{ '--gap': '16px' }} onClick={() => search()}>
        搜索
      </Space>
    </div>
  )

  return (
    <div>
      <NavBar
        style={{ width:'100%', position: 'fixed', top: 0, left: 0, background: '#fff' }}
        onBack={changeCity}
        back={cityName}
        backArrow={false}
        right={right}
      >影院</NavBar>
      <div style={{ height: '50px' }}></div>
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
const mapStateToProps = (state) => {
  let { CityReducer: { cityName }, CinemaListReducer: { list } } = state
  return {
    cityName,
    list
  }
}
const mapDispatchToProps = {
  getCinemaListAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Cinemas)