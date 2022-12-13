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
    list: [],
    type: 1
  }



  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return {
      type: props.type
    }
  }
  componentDidMount(){
    console.log('componentDidMount');
    if (this.props.type === 1) {
      this.getList(1)
    } else {
      this.getList(2)
    }
  }
  componentDidUpdate(props){
    const { type } = this.state
    if(type === props.type) return
    console.log('componentDidUpdate');
    this.getList(type)
  }
  getList = async (type) => {
    try {
      let k = type === 1 ? '4740541' : '6470233'
      let res = await axios({
        url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=${type}&k=${k}`,
        method: 'GET',
        headers: {
          'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "1670389696259381664940033", "bc": "110100" }',
          'X-Host': 'mall.film-ticket.film.list'
        }
      })
      let { films: list } = res.data.data
      await this.setState({
        list
      })
      
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let { list } = this.state
    return (
      <div>
        {
          list.map(m =>
            <li key={m.filmId}>{m.name}</li>
          )
        }
      </div>
    )
  }
}
