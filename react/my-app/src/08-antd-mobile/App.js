import React, { useEffect } from 'react'
import IndexRouter from './router/IndexRouter'
import Tabbar from './components/Tabbar'
import './views/css/App.css'
import {connect} from 'react-redux'

function App(props) {
  let {show} = props
  useEffect(() => {
    console.log(show);
  }, [show])
  return (
    <div>
      <IndexRouter>
        {show &&  <Tabbar />}
      </IndexRouter>
    </div>
  )
}
const mapStateToProps = (state) => {
  let {show} = state.TabbarReducer
  return {
    show
  }
}
export default connect(mapStateToProps)(App)
