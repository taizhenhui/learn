import React, { Component } from 'react'

export default class Field extends Component {
  render() {
    let { label, type, onChangeEvent, value } = this.props
    return (
      <div style={{ padding: '10px 0' }}>
        <label >{label}</label>
        <input type={type} onChange={(e) => onChangeEvent(e)} value={value} />
      </div>
    )
  }
}
