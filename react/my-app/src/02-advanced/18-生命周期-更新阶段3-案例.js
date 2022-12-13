import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
  state = {
    type: 1
  }
  switchType = (type) => {
    this.setState({ type })
  }
  render() {
    return (
      <div>
        <ul>
          <li onClick={() => this.switchType(1)}>正在热映</li>
          <li onClick={() => this.switchType(2)}>即将上映</li>
        </ul>
        <FilmList type={this.state.type}></FilmList>
      </div>
    )
  }
}

class FilmList extends Component {
  state = {
    list: []
  }
  componentDidMount() {
    if (this.props.type === 1) {
      this.getList(1)
    } else {
      this.getList(2)
    }

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.type === 1) {
      console.log('正在热映');
      this.getList(1)
    } else {
      console.log('即将上映');
      this.getList(2)
    }

  }
  getList = (type) => {
    let k = type === 1 ? '4740541' : '6470233'
    axios({
      url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=${type}&k=${k}`,
      method: 'GET',
      headers: {
        'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "1670389696259381664940033", "bc": "110100" }',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      let { films: list } = res.data.data
      this.setState({
        list
      })
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    let { type } = this.props
    return (
      <div>
        FilmList-{type}
      </div>
    )
  }
}
