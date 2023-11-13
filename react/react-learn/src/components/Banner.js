import React, { Component } from 'react'
import "../style/Banner.css"
import PropTypes from 'prop-types'
import ImgContainer from './ImgContainer'

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
    imgContainerRef = el => {
        this.imgContainer = el
    }
    handleSwitch = index => {
        this.imgContainer.switchTo(index)
    }
    render() {
        return (
            <div className='banner-container' style={{
                width: this.props.width,
                height: this.props.height
            }}>
                <ImgContainer
                    ref={this.imgContainerRef}
                    imgSrcs={this.props.imgSrcs}
                    imgWidth={this.props.width}
                    imgHeight={this.props.height}
                    duration={this.props.duration}
                />
            </div>
        )
    }
}
