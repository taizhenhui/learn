import React, { Component } from 'react'
import './css/05-event.css'
export default class App extends Component {
  state = {
    todoList: [],
    todoText: ''
  }
  addHandle = () => {
    let { todoText } = this.state
    if (!todoText) return alert('请输入')

    const { todoList } = this.state
    let obj = {
      id: new Date().getTime(),
      value: todoText,
      isChecked: false,
    }
    todoList.unshift(obj)
    this.setState({
      todoList,
      todoText: '',
    })
  }
  delHandle = (info) => {

    const { todoList } = this.state
    const index = todoList.findIndex(f => f.id === info.id)
    todoList.splice(index, 1)
    this.setState({
      todoList
    })
  }
  changeHandle = (e) => {
    this.setState({
      todoText: e.target.value
    })
  }
  finishHandle = (i) => {
    let { todoList } = this.state
    todoList[i].isChecked = !todoList[i].isChecked
    this.setState({
      todoList
    })
  }
  render() {
    let { todoList, checked } = this.state
    let list = todoList.map((m, i) =>
      <div className='list fl' key={m.id}>
        {/* 富文本展示 */}
        <input type="checkbox" checked={m.isChecked} onChange={() => this.finishHandle(i)} />
        <p style={{ textDecoration: m.isChecked ? 'line-through' : '' }} dangerouslySetInnerHTML={{ __html: m.value }}></p>
        <button onClick={() => this.delHandle(m)}>del</button>
      </div>
    )
    return (
      <div className='container'>
        <div className='header fl'>
          <input type="text" value={this.state.todoText} onChange={(e) => this.changeHandle(e)} />
          <button onClick={() => this.addHandle()}>添 加</button>
        </div>
        <div className='content'>
          {!todoList.length ? <div>暂无代办</div> : list}
        </div>
      </div>

    )
  }
}
