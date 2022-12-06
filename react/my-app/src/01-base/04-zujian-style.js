
import React, { Component } from 'react'
import './css/01-index.css' // 导入css模块， webpack支持

export default class App extends Component {

  render() {
    var name = 't'
    return (
      <div className='active1' >
        {name}-{30 + 10}
        <h1 style={ {background:'pink',color: 'red', fontSize:'30px'} }>
          {10 > 20 ? 10 : 20}
        </h1>
        <label htmlFor='username'>用户名：</label>
        <input type='text' id='username' />
      </div>

    )
  }
}