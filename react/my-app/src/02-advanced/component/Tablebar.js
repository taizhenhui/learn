import React, { Component } from 'react'
import '../css/12-select-card.css'
export default class Tablebar extends Component {

  render() {
    const { list, current, selectHandle } = this.props
    return (
      <div>
        <div className='footer_bar fl'>
          {
            list.map((m, index) =>
              <div
                key={m.id}
                className={current === index ? 'active' : ''}
                onClick={() => selectHandle(index)}
              >{m.name}</div>
            )
          }
        </div>
      </div>
    )
  }
}
