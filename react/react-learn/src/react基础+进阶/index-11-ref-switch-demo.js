import ReactDOM from 'react-dom'
import Banner from '../components/Banner'
import React, { Component } from 'react'
import src1 from './components/img/1.jpg'
import src2 from './components/img/2.webp'
import src3 from './components/img/3.jpg'
import src4 from './components/img/4.jpg'
import src5 from './components/img/5.webp'

class Test extends Component {
    state = {
        imgSrcs: [ src1, src2, src3, src4, src5 ]
    }
    render() {
        return (
            <div className='container'>
                <Banner
                    width={520}
                    height={280}
                    imgSrcs={this.state.imgSrcs}
                    autoDuration={3000}
                    duration={500}
                />
            </div>
        )
    }
}


ReactDOM.render(<Test />, document.getElementById('root'))
