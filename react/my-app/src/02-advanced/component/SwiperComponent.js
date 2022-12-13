import React, { Component } from 'react'
import 'swiper/swiper-bundle.min.css'
import '../css/swiper.css'
import Swiper , { Navigation, Pagination } from 'swiper'
// Swiper.use([Navigation, Pagination])
export default class SwiperComponent extends Component {

  render() {
    return (
      <div>
        <div className="swiper">
          <div className="swiper-wrapper">
            {this.props.children}
          </div>

          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

        </div>
      </div>
    )
  }
  componentDidUpdate(){
    console.log('3333');
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
      
    })
  }
}
