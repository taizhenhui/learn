import React, { Component } from 'react'
import './css/12-select-card.css'

import Film from './component/Film'
import Center from './component/Center'
import Cinma from './component/Cinma'

export default class App extends Component {
  state = {
    list: [
      { id: 1, name: '电影' },
      { id: 2, name: '影院' },
      { id: 3, name: '我的' }
    ],
    current: 0
  }
  render() {
    const { list, current } = this.state
    return (
      <div className='container'>
        <div className='content'>
          {current === 0 && <Film></Film>}
          {current === 1 && <Cinma></Cinma>}
          {current === 2 && <Center></Center>}
          {/* {this.showComponent(current)} */}
        </div>
        <div className='footer_bar fl'>
          {
            list.map((m, index) =>
              <div
                key={m.id}
                className={current === index ? 'active' : ''}
                onClick={() => this.selectHandle(index)}
              >{m.name}</div>
            )
          }
        </div>
      </div>
    )
  }
  // showComponent = (current) => { 
  //   switch (current) {
  //     case 0:
  //       return <Film></Film>
  //     case 1:
  //       return <Center></Center>
  //     case 2:
  //       return <Cinma></Cinma>
  //   }
  // }
  selectHandle = (i) => {
    let { current } = this.state
    current = i
    this.setState({
      current
    })
  }
}
