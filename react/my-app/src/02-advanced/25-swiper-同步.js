import React, { Component } from 'react'
import 'swiper/swiper-bundle.min.css'
import './css/swiper.css'
import Swiper , { Navigation, Pagination } from 'swiper'
export default class App extends Component {
  state = {
    list: ['111', '222', '333']
  }
  render() {
    const { list } = this.state
    return (
      <div>
        <div className="swiper">
          <div className="swiper-wrapper">
            {
              list.map((m, index) =>
                <div className="swiper-slide" key={index}>{m}</div>
              )
            }
          </div>

          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

          {/* <div className="swiper-scrollbar"></div> */}
        </div>
      </div>
    )
  }
  componentDidMount() {
    new Swiper('.swiper',{
      modules: [Navigation, Pagination],
      loop: true, // 循环模式选项
    
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  }
}
