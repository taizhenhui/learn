import React, { Component } from 'react'
import './css/12-select-card.css'

import Film from './component/Film'
import Center from './component/Center'
import Cinma from './component/Cinma'
import Tablebar from './component/Tablebar'
import Navbar from './component/Navbar'
export default class App extends Component {
  state = {
    list: [
      { id: 1, name: '电影' },
      { id: 2, name: '影院' },
      { id: 3, name: '我的' }
    ],
    current: 0,
    cinemasList:[]
  }
  selectHandle = (i) => {
    this.setState({
      current:i
    })
  }
  render() {
    const { list, current } = this.state
    return (
      <div className='container'>
        <Navbar 
          goMine={() => this.selectHandle(2)} 
          current={current} 
          goBack={() => this.selectHandle(0)} />

        <div className='content'>
          {current === 0 && <Film></Film>}
          {current === 1 && <Cinma></Cinma>}
          {current === 2 && <Center></Center>}
        </div>

        <Tablebar 
          list={list} 
          current={current} 
          selectHandle={(i) => this.selectHandle(i)} />

      </div>
    )
  }

}
