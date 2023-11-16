import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CheckBoxGroup from '../components/CheckBoxGroup'

class CheckBoxTest extends Component {
    state = {
        datas: [
            { value: "football", text: "足球" },
            { value: "basketball", text: "篮球" },
            { value: "movie", text: "电影" },
        ],
        chooseDatas:[],
        name:'love'
    }
    handleChange = (arr, name, e) => {
        console.log(arr, name, e, 'arr----');
        this.setState({
            chooseDatas: arr
        })
    }
  render() {
    return (
      <div>
         <CheckBoxGroup
            name={this.state.name}
            datas={this.state.datas}
            chooseDatas={this.state.chooseDatas}
            onChange={this.handleChange} />
      </div>
    )
  }
}

ReactDOM.render(<CheckBoxTest />, document.getElementById('root'))
