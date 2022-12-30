import style from './css/Tabbar.module.css'
import {NavLink} from 'react-router-dom'
export default function Tabbar() {
  return (
    <div className={style.tabbar_sty}>
        <li>
          <NavLink to='/films' activeClassName={style.active}>电影</NavLink>
        </li>
        <li>
          <NavLink to='/cinemas' activeClassName={style.active}>影院</NavLink>
        </li>
        <li>
          <NavLink to='/center' activeClassName={style.active}>我的</NavLink>
        </li>
    </div>
  )
}