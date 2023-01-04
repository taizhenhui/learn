import { useEffect, } from "react"
import { useHistory } from "react-router-dom"
import getCinemaListAction from "../redux/actionCreator/getCinemaListAction"
import '../../01-base/component/style.css'
import { connect } from 'react-redux'
let styleObj = {
  marginBottom: '10px',
  padding: '10px',
  borderBottom: '1px solid #eee'
}
function Cinemas(props) {
  const history = useHistory()
  let { cityName, list, getCinemaListAction } = props

  useEffect(() => {
    if (list.length === 0) getCinemaListAction()
    
  }, [list, getCinemaListAction])

  const changeCity = () => history.push('/city')

  const search = () => history.push('/cinemas/search')

  return (
    <div>
      <div className='header fl'>
        <h4 onClick={() => changeCity()} style={{ float: 'left' }}>{cityName}</h4>
        <h4 onClick={() => search()} style={{ float: 'right', fontWeight: '500' }}>{'搜索'}</h4>
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