import React, { Component } from 'react'
import axios from 'axios'
import FilmItem from './component/FilmItem'
import FilmDetail from './component/FilmDetail'
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
    const { films, info } = this.state
    return (
      <div>
        {
          films.map(item=>
            <FilmItem {...item}  key={item.filmId} getDetail={(info)=>this.getDetail(info)}/>
          )
        }
        <FilmDetail info={info}/>
      </div>
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
  getDetail= (info) => {
    this.setState({
      info
    })
  }
}
