import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, } from 'react-router-dom'

let prevLocation, location, action, unBlock;
class _GuardHelper extends Component {
    componentDidMount() {
        // console.log(this.props);
        // 设置阻塞
        unBlock = this.props.history.block((newLocation, ac) => {
            prevLocation = this.props.location
            location = newLocation
            action = ac
            return ""
        })

        // 添加一个监听事件
        this.unLisent = this.props.history.listen((location, action)=>{
            if(this.props.onChange){
                const prevLocation = this.props.location
                this.props.onChange(prevLocation, location, action, this.unLisent)
            }
        })

    }
    componentWillUnmount() {
        // 取消阻塞
        unBlock()
        this.unLisent()
    }
    render() {
        return null
    }
}
const GuardHelper = withRouter(_GuardHelper)

class RouteGuard extends Component {

    handleConfim = (mag, callback) => {
        if (this.props.onBeforeChange) {
            this.props.onBeforeChange(prevLocation, location, action, callback, unBlock)
        }else{
            callback(true)
        }
    }
    render() {
        return (
            <Router getUserConfirmation={this.handleConfim}>
                <GuardHelper onChange={this.props.onChange}/>
                {this.props.children}
            </Router>
        )
    }
}

export default RouteGuard

