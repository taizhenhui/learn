import style from './css/Tabbar.module.css'
import { useHistory, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
const tabs = [
  {
    key: 'films',
    title: '电影',
    icon: <AppOutline />
  },
  {
    key: 'cinemas',
    title: '影院',
    icon: <UnorderedListOutline />
  },
  {
    key: 'center',
    title: '我的',
    icon: <UserOutline />,
  },
]
export default function Tabbar(props) {
  const history = useHistory()
  const location = useLocation()
  console.log(location,'location');
  const setRouteActive = (value) => {
    console.log(value, 'value');
    history.push(`/${value}`)
  }
  return (
    <div className={style.tabbar_sty} >
      <TabBar onChange={value => setRouteActive(value)} className={`${style['adm-tab-bar']}`} activeKey={location.pathname.split('/')[1]}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}