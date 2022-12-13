import React, { Component } from 'react'
import BetterScroll from 'better-scroll'
export default class App extends Component {
  state={
    list:[

    ]
  }
  UNSAFE_componentWillMount(){
    this.setState({
      list:this.getLst()
    })
  }
  componentDidMount(){
    new BetterScroll("#wrapper")
  }
  getLst(){
    let list= [], num = 100
    for (let i = 0; i < num; i++) {
      list.push(i)
    }
    return list
  }
  render() {
    const { list } = this.state
    return (
      <div>
        <div id="wrapper" style={{height:'300px',overflow:'hidden'}}>
          <div>
            {
              list.map(m=>
                <li key={m}>{m}</li>
                )
            }
          </div>
        </div>
      </div>
    )
  }
}
