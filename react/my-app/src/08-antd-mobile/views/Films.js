import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import NowPlaying from "./films/NowPlaying";
import Comingsoon from "./films/Comingsoon";
import { Swiper, Toast } from 'antd-mobile'
import { Tabs } from 'antd-mobile'
import { connect } from "react-redux";
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
const content = {
  height: '100%',
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '48px',
  userSelect: 'none',
}
const tabsContainer = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background:'#fff',
}
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      style={{ background: color, ...content }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))
function Films(props) {
  const history = useHistory()
  let { active, change } = props
  const changeTab = (value) => {
    change(value)
    history.push(`/films/${value}`)
  }
  return (
    <div>
      <Swiper autoplay loop={true} style={{ width: '100%', height: '200px' }}>{items}</Swiper>
      <div style={tabsContainer}>
        <Tabs onChange={(value) => changeTab(value)} activeKey={active} >
          <Tabs.Tab title='正在热映' key='nowPlaying' />
          <Tabs.Tab title='即将上映' key='comingsoon' />
        </Tabs>
      </div>

      <Switch>
        {/* 路由 嵌套路由 */}
        <Route path='/films/nowPlaying' component={NowPlaying} />
        <Route path='/films/comingsoon' component={Comingsoon} />
        <Redirect from="/films" to='/films/nowPlaying' />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  let { palyActiveKeyReducer: { active } } = state
  return {
    active
  }
}
const mapDispatchToProps = {
  change(value) {
    return {
      type: 'change-active',
      value
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Films) 