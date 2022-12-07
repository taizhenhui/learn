import React, { Component } from 'react'
import BetterScroll from 'better-scroll'


export default class betterScroll extends Component {
  state = {
    list: []
  }
  render() {
    const { list } = this.state
    return (
      <div>
        <button onClick={() => this.getData()}>click</button>
        <div className="wrapper" style={{ height: '200px', overflow: 'hidden' }}>
          <ul className="content">
            {
              list.map((m, i) =>
                <li key={i}>{m}</li>
              )
            }
          </ul>
        </div>

      </div>
    )
  }
  getData = () => {
    let list = []
    for (let index = 0; index < 100; index++) {
      list.push(index)
    }
    this.setState({
      list
    },() => {
      new BetterScroll('.wrapper', {
        movable: true,
        zoom: true
      })
    })
   
  }
}
