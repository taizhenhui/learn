import React, { Component } from 'react'
import SwiperComponent from './component/SwiperComponent'
import SwiperItem from './component/SwiperItem'
export default class App extends Component {
  state = {
    list: []
  }
  render() {
    const {
      list
    } = this.state
    return (
      <div>
        <SwiperComponent>
          {
            list.map((m, i) => <SwiperItem key={i}>{m}</SwiperItem>)
          }
        </SwiperComponent>
      </div>
    )
  }
  componentDidMount() {
    console.log('11111');
    setTimeout(() => {
      this.setState({
        list: ['asdf', 'qwer', 'dfgh']
      })
    }, 1000)
  }
}
