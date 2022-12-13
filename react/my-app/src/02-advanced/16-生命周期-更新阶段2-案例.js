import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: [

    ],
    current: 1
  }
  componentDidMount() {
    this.setState({
      list: this.getLst()
    })
  }
  getLst() {
    let list = [], num = 15
    for (let i = 0; i < num; i++) {
      list.push(i)
    }
    return list
  }
  render() {
    const { list } = this.state
    return (
      <div>
        <input type="number" onChange={(e)=>{
          this.setState({
            current:e.target.value || 1
          })
        }}/>
        <div style={{ overflow: 'hidden', marginTop: '10px' }}>
          {
            list.map((m, i) =>
              <Child key={m} current={+this.state.current} index={i+1}>{m}</Child>
            )
          }
        </div>
      </div>
    )
  }
}


class Child extends Component {
  shouldComponentUpdate(nextProps, nextState) { 
    if(this.props.current === this.props.index || nextProps.current === nextProps.index){
      return true
    }
    return false
   }
  render() {
    console.log('Child-render');
    const { current, index } = this.props
    return (
      <div style={{ width: '100px', height: '40px', border: +current ===  +index ? '1px solid red' : '1px solid #999', margin: '10px', float: 'left' }}>

      </div>
    )
  }
}
