import { Redirect, Route, Switch } from "react-router-dom";
import {NavLink} from 'react-router-dom'
import NowPlaying from "./films/NowPlaying";
import Comingsoon from "./films/Comingsoon";
export default function Films() {
  return (
    <div>
      <div style={{width:'100%',height:'200px',background:'red'}}>轮播</div>
      <div>
        <li > <NavLink to='/films/nowPlaying'>正在热映</NavLink> </li>
        <li > <NavLink to='/films/comingsoon'>即将上映</NavLink> </li>
      </div>
      <Switch>
        {/* 路由 嵌套路由 */}
        <Route path='/films/nowPlaying' component={NowPlaying} />
        <Route path='/films/comingsoon' component={Comingsoon} />
        <Redirect from="/films" to='/films/nowPlaying'/>
      </Switch>
    </div>
  )
}