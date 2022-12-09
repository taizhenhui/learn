import React, { Component } from 'react'
import axios from 'axios'
import FilmItem from './component/FilmItemCopy'
import FilmDetail from './component/FilmDetailCopy'


export default class App extends Component {
  constructor() {
    super()
    this.getData()
    this.state = {
      films: [],
    }
  }
  render() {
    const { films } = this.state
    return (
      <div>
        {
          films.map(item =>
            <FilmItem {...item} key={item.filmId} />
          )
        }
        <FilmDetail />
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
  getDetail = (info) => {
    this.setState({
      info
    })
  }
}


