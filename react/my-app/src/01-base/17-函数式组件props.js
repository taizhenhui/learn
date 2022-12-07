import React, { Component } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar title='导航' leftshow={false} rightshow={true}></Navbar>
        <Sidebar bg='pink' width={'100px'}></Sidebar>
      </div>
    )
  }
}


