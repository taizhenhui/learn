import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  state = {
    name: 'tai'
  }
  render() {
    console.log('render');
    return (
      <div>
        <button onClick={() => {
          this.setState({
            name: 'mou'
          })
        }}>{this.state.name}</button>
        {this.state.name}
      </div>
    )
  }
  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentdidupdate');

  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   console.log('shouldComponentUpdate');
  //   // return true  // 可以更新
  //   // return false  // 阻止更新
  //   // 老状态: this.state
  //   // 新状态: nextState
  //   // if (老状态 !== 新状态) {
  //   //   return true
  //   // }
  //   // return false
  //   if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
  //     return true
  //   }
  //   return false
  // }
}
