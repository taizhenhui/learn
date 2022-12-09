import React, { Component } from 'react'
import '../css/filmItem.css'
import bus from '../bus'
export default class FilmItem extends Component {
  render() {
    const { poster, name, grade, synopsis, actors, nation, runtime } = this.props
    return (
      <div className='container fl' onClick={() => this.getSynopsis(synopsis)}>
        <div className='l_img'>
          <img src={poster} alt={name} />
        </div>
        <div className='r_info fl-column'>
          <h1 className='fl'>{name} </h1>
          <p className='info_grade'>观众评分 <span>{grade}</span></p>
          <p className='info_actors text_ell'>主演：
            {
              actors.map((m, i) => <span key={i}>{m.name} </span>)
            }</p>
          <p className='info_nation'><span>{nation}</span> | <span>{runtime}分钟</span></p>
        </div>
        <div className='pay_btn'>
          <button>购票</button>
        </div>
      </div>
    )
  }
  getSynopsis = (synopsis) => {
    // 发布
    bus.publish(synopsis)
  }
}
