import './css/Tabbar.css'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
function Tabbar() {
  const [active, setActive] = useState('/films')
  useEffect(()=>{
    window.addEventListener('popstate',handleActive(window.location.pathname))
    return ()=>{
      window.removeEventListener('popstate',handleActive(window.location.pathname))
    }
  })
  const handleActive = (type) => {
    type = type==='/' || type==='' ? '/films' : type
    setActive(type)
  }
  return (
    <div className='TabbarContainer'>
        <li onClick={()=>handleActive('/films')}>
          <Link to='/' className={active.includes('/films') || active==='/' || active===''? 'activeStyle' : ''}>电影</Link>
        </li>
        <li onClick={()=>handleActive('/cinemas')}>
          <Link to='/cinemas' className={ active.includes('/cinemas') ? 'activeStyle' : ''}>影院</Link>
        </li>
        <li onClick={()=>handleActive('/center')}>
          <Link to='/center' className={active.includes('/center') ? 'activeStyle' : ''}>我的</Link>
        </li>
    </div>
  )
}

export default Tabbar