import React, { Component } from 'react'
import axios from 'axios'
import FilmItem from './component/FilmItemContext'
import FilmDetail from './component/FilmDetailContext'

import GlobalContext from './context'

export default class App extends Component {
  constructor() {
    super()
    this.getData()
    this.state = {
      films: [],
      info:''
    }
  }
  render() {
    const { films,info } = this.state
    return (
      <GlobalContext.Provider value={{
          info: info,
          changeInfo:(value)=>{
            this.setState({
              info: value
            })
          }
        }}>
        <div>
          {films.map(item => <FilmItem {...item} key={item.filmId} />)}
          <FilmDetail />
        </div>
      </GlobalContext.Provider>
    )
  }
  getData = () => {
    axios.get(`/test.json`)
      .then(res => {
        let { films } = res.data.data
        this.setState({
          films
        })
      })
      .catch(err => console.log(err))
  }
  getDetail = (info) => {
    this.setState({
      info
    })
  }
}


