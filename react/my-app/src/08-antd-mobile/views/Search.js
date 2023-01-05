import React, { useEffect, useMemo, useState } from 'react'
import getCinemaListAction from '../redux/actionCreator/getCinemaListAction'
import '../../01-base/component/style.css'
import { useHistory } from 'react-router-dom'
import { hide, show } from '../redux/actionCreator/TabbarActionCreator'
import { connect } from 'react-redux'
import { SearchBar } from 'antd-mobile'
let styleObj = {
  marginBottom: '10px',
  padding: '10px',
  borderBottom: '1px solid #eee'
}
let btnSty = {
  width: '40px',
  height: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  fontSize: '14px'
}
function Search(props) {
  const history = useHistory()
  const [myText, setMyText] = useState('')
  let { hide, show, list, getCinemaListAction } = props
  useEffect(() => {
    if (list.length === 0) getCinemaListAction()
    hide()
    return () => show()
  }, [hide, show, list, getCinemaListAction])
  const handleInput = (value) => setMyText(value)

  const getCinemasList = useMemo(() =>
    list.filter(f => f.name.toUpperCase().includes(myText.toUpperCase()) || f.address.toUpperCase().includes(myText.toUpperCase()))
    , [list, myText])
  return (
    <div>
      <div style={{ width: '100%', position: 'fixed', top: 0, left: 0, background: '#fff', padding: '5px' }}>
        <SearchBar
          placeholder='请输入内容'
          showCancelButton={() => true}
          onCancel={() => history.goBack()}
          onChange={(value) => handleInput(value)} />

      </div>
      <div style={{ height: '60px' }}></div>
      <div className=''>
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

const mapStateToProps = (state) => {
  let { CinemaListReducer: { list } } = state
  return {
    list,
  }
}
const mapDispatchToProps = {
  hide, show, getCinemaListAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)