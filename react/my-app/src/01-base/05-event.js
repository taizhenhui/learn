import React, { Component } from 'react'
import './css/05-event.css'
export default class App extends Component {
  mytext = React.createRef()
  state = {
    todoList: []
  }
  addHandle = () => {
    let { value } = this.mytext.current
    if (!value) return alert('请输入')

    const { todoList } = this.state
    let obj = {
      id: new Date().getTime(),
      value
    }
    todoList.unshift(obj)
    this.setState({
      todoList
    })
    this.mytext.current.value = ''
  }
  delHandle = (info) => {

    const { todoList } = this.state
    const index = todoList.findIndex(f => f.id === info.id)
    todoList.splice(index, 1)
    this.setState({
      todoList
    })
  }

  render() {
    const { todoList } = this.state
    const list = todoList.map(m =>
      <div className='list fl' key={m.id}>
        {/* 富文本展示 */}
        <p dangerouslySetInnerHTML={{__html:m.value}}></p>
        <button onClick={() => this.delHandle(m)}>del</button>
      </div>
    )
    return (
      <div className='container'>
        <div className='header fl'>
          <input type="text" ref={this.mytext} />
          <button onClick={() => this.addHandle()}>添 加</button>
        </div>
        <div className='content'>
          {/* {!todoList.length ? <div>暂无代办</div> : list} */}
          {list}
          {!todoList.length && <div>暂无代办</div>}
        </div>
      </div>

    )
  }
}
