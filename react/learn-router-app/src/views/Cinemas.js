import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './css/Cinemas.css'
function Cinemas() {
  const [type, setType] = useState(1)
  const navigate = useNavigate()
  const handleTabs = (type) => {
    setType(type)
    type === 1 
      ? navigate('/cinemas/nowPlaying')
      : navigate('/cinemas/comingsoon')
  }

  return (
    <div>
      <div style={{width:'100%',height:'200px',background:'pink'}}></div>
      <div className='tabs_sty'>
        <span onClick={()=>handleTabs(1)} className={type===1?'activeTabs':''}>正在热映</span>
        <span onClick={()=>handleTabs(2)} className={type===2?'activeTabs':''}>即将上映</span>
      </div>
      <Outlet></Outlet>
    </div>
  )
}


export default Cinemas