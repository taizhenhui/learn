import React, { Component } from 'react'
import '../css/filmDetail.css'
import GlobalContext from '../context'
export default class FilmDetail extends Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {
          (value) => {
            return (
              <div className='container1'>
                <span>
                  {value.info}
                </span>
              </div>
            )
          }
        }
      </GlobalContext.Consumer>
    )
  }
}
