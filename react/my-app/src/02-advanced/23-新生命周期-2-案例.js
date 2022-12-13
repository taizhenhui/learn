import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
  myref = React.createRef()
  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            list: [...[10, 11, 12, 13, 14, 15], ...this.state.list]
          })
        }}>来邮件</button>
        <h1>邮箱应用</h1>
        <div style={{ height: '200px', overflow: 'auto' }} ref={this.myref}>
          <ul>
            {
              this.state.list.map(m =>
                <li key={m} style={{ height: '100px', background: 'pink' }}>{m}</li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState, value) {
    this.myref.current.scrollTop = (this.myref.current.scrollHeight - value.scrollHeight) + value.scrollTop
  }
  getSnapshotBeforeUpdate() {
    let {scrollTop, scrollHeight} = this.myref.current
    return {
      scrollTop, 
      scrollHeight
    }
  }
}
