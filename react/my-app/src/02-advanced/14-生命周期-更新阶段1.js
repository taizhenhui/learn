import React, { Component } from 'react'

export default class App extends Component {
  state = {
    name: 'tai'
  }
  UNSAFE_componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  
  UNSAFE_componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    console.log('componentDidUpdate');
  }
  render() {
    console.log('render');
    return (
      <div>
        <button onClick={() => {
          this.setState({
            name: 'mou'
          })
        }}>click</button>
        {this.state.name}
      </div>
    )
  }
}
