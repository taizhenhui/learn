import React, { Component } from 'react'
import axios from 'axios'
import './style.css'
import BetterScroll from 'better-scroll'
export default class Cinma extends Component {
  constructor() {
    super()

    // 请求数据
    this.getdata()
    this.state = {
      cinemasList: [],
      myText: '',
    }

  }

  render() {
    let styleObj = {
      marginBottom: '10px',
      padding: '10px',
      borderBottom: '1px solid #eee'
    }
    return (
      <div >
        <div className='header fl'>
          <input type="text" value={this.state.myText} onChange={(e) => this.handleInput(e)} />
        </div>
        <div className='wrapper'>
          <div className='content'>
            {
              this.getCinemasList().map(m =>
                <div key={m.cinemaId} style={styleObj}>
                  <p>{m.name}</p>
                  <p style={{ color: '#999', marginTop: '5px' }}>{m.address}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
  getdata = async () => {
    try {
      let res = await axios({
        url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5790034',
        method: 'get',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1670389696259381664940033","bc":"110100"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      })
      let { data: { cinemas }, } = res.data
      this.setState({
        cinemasList: cinemas,
      }, () => {
        new BetterScroll('.wrapper')
      })

    } catch (error) {
      console.log(error);
    }
  }
  getCinemasList = () => {
    let { myText, cinemasList } = this.state
    return cinemasList.filter(f => f.name.toUpperCase().includes(myText.toUpperCase()) || f.address.toUpperCase().includes(myText.toUpperCase()))
  }
  handleInput = (e) => {
    this.setState({
      myText: e.target.value
    })
    // let { searchList, cinemasList } = this.state
    // searchList = cinemasList.filter(f => f.name.toUpperCase().includes(e.target.value.toUpperCase()) || f.address.toUpperCase().includes(e.target.value.toUpperCase()))
    // this.setState({
    //   cinemasList: searchList
    // }, () => {

    // })
    // console.log(searchList);

  }
}
