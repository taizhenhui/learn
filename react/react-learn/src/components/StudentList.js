import React, { Component } from 'react'
import Student from './Student'

export default class StudentList extends Component {
  render() {
    const {stus} = this.props
    return (
      <ul>
        {stus.map(item => <Student {...item} key={item.id}/>)}
      </ul>
    )
  }
}
