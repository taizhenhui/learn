import React, { useEffect ,useState} from 'react'
import IndexRouter from './router/IndexRouter'
import Tabbar from './components/Tabbar'
import './views/css/App.css'
import store from './redux/store'
export default function App() {
  const [isShow, setIsShow] = useState(true)
  useEffect(() => {
    store.subscribe(() => {
      let {show} = store.getState().TabbarReducer
      setIsShow(show)
    })
  }, [])
  return (
    <div>
      <IndexRouter>
        {isShow &&  <Tabbar />}
      </IndexRouter>
    </div>
  )
}

