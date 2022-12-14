import React, { useState, useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import './css/filmItem.css'
import './css/filmDetail.css'
// import FilmItem from './component/FilmItemContext'
// import FilmDetail from './component/FilmDetailContext'
import GlobalContext from './context'


const initState = {
  films: [],
  info: ''
}

const reducer = (prevState, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'getData':
      newState.films = action.value
      return newState
    case 'getSynopsis':
      newState.info = action.value
      return newState

    default:
      return prevState
  }
}


export default function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    axios.get(`/test.json`)
      .then(res => {
        let { films } = res.data.data
        dispatch({
          type: 'getData',
          value: films
        })
      })
      .catch(err => console.log(err))
  }
  return (
    <GlobalContext.Provider value={
      {
        state,
        dispatch
      }
    }>
      <div>
        {state.films.map(item => <FilmItem {...item} key={item.filmId} />)}
        <FilmDetail />
      </div>
    </GlobalContext.Provider>
  )
}


function FilmItem(props) {
  // const { info } = useContext(GlobalContext)
  const { dispatch } = useContext(GlobalContext)

  const { poster, name, grade, synopsis, actors, nation, runtime } = props

  return (
    <div className='container fl' onClick={() => {
      dispatch({
        type: 'getSynopsis',
        value: synopsis
      })
    }}>
      <div className='l_img'>
        <img src={poster} alt={name} />
      </div>
      <div className='r_info fl-column'>
        <h1 className='fl'>{name} </h1>
        <p className='info_grade'>观众评分 <span>{grade}</span></p>
        <p className='info_actors text_ell'>主演：
          {
            actors.map((m, i) => <span key={i}>{m.name} </span>)
          }</p>
        <p className='info_nation'><span>{nation}</span> | <span>{runtime}分钟</span></p>
      </div>
      <div className='pay_btn'>
        <button>购票</button>
      </div>
    </div>
  )

}

function FilmDetail() {
  const { state } = useContext(GlobalContext)
  return (
    <div className='container1'>
      <span>
        {state.info}
      </span>
    </div>
  )
}
