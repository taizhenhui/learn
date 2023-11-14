import React, { Component } from 'react'
import "../style/Banner.css"
import PropTypes from 'prop-types'
import ImgContainer from './ImgContainer'
import SwitchArrow from './SwitchArrow'
import SwitchDot from './SwitchDot'

export default class Banner extends Component {
    static defaultProps = {
        width: 520,
        height: 280,
        imgSrcs: [],
        autoDuration: 3000,
        duration: 500,
    }
    static propTypes = {
        width: PropTypes.number.isRequired, // 容器宽度
        height: PropTypes.number.isRequired, // 容器高度
        imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, // 图片路径
        autoDuration: PropTypes.number.isRequired, // 自动切换的间隔时间
        duration: PropTypes.number.isRequired, // 完成一次切换需要的时间
    }
    state = {
        curIndex: 0
    }
    timer = null;
    autoSwitch() {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            let cur = this.state.curIndex
            cur = (cur + 1) % this.props.imgSrcs.length
            this.handleSwitch(cur)
        }, this.props.autoDuration)

    }
    componentDidMount() {
        this.autoSwitch()
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    imgContainerRef = el => {
        this.imgContainer = el
    }
    handleArrowChange = (type) => {
        let cur = this.state.curIndex
        if (type === 'left') {
            cur--
            if (cur < 0) {
                cur = this.props.imgSrcs.length - 1
            }

        } else {
            cur++
            if (cur > this.props.imgSrcs.length - 1) {
                cur = 0
            }
        }
        this.handleSwitch(cur)
    }
    handleSwitch = index => {
        this.setState({
            curIndex: index
        })
        this.imgContainer.switchTo(index)
    }
    render() {
        return (
            <div
                className='banner-container'
                style={{
                    width: this.props.width,
                    height: this.props.height
                }}
                onMouseEnter={() => {
                    clearInterval(this.timer)
                }}
                onMouseLeave={() => {
                    this.autoSwitch()
                }}
            >
                <ImgContainer
                    ref={this.imgContainerRef}
                    imgSrcs={this.props.imgSrcs}
                    imgWidth={this.props.width}
                    imgHeight={this.props.height}
                    duration={this.props.duration}
                />
                <SwitchArrow onChange={this.handleArrowChange} />
                <SwitchDot
                    total={this.props.imgSrcs.length}
                    curIndex={this.state.curIndex}
                    onChange={this.handleSwitch} />
            </div>
        )
    }
}
