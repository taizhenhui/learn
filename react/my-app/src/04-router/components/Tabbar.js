import './css/Tabbar.css'
import {NavLink} from 'react-router-dom'
export default function Tabbar() {
  return (
    <div>
        <li>
          <NavLink to='/films'>电影</NavLink>
        </li>
        <li>
          <NavLink to='/cinemas'>影院</NavLink>
        </li>
        <li>
          <NavLink to='/center'>我的</NavLink>
        </li>
    </div>
  )
}