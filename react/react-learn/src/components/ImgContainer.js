import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ImgContainer extends Component {
    static defaultProps = {
        imgSrcs: [],
        imgWidth: 520,
        imgHeight: 280,
    }
    static propTypes = {
        imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, // 图片数组
        imgWidth: PropTypes.number.isRequired, // 单张图片宽度
        imgHeight: PropTypes.number.isRequired, // 单张图片高度
        duration: PropTypes.number.isRequired, // 在多长时间内完成动画
    }

    containerRef = el => {
        this.div = el
    }

    tick = 16
    timer = null
    /**
     * 切换到第几张图片
     * @param {*} index 图片下标，从0开始
     */
    switchTo(index) {
        if (index < 0) index = 0
        else if (index > this.props.imgSrcs.length - 1) index = this.props.imgSrcs.length - 1
        // 根据index，计算div最终的marginLeft
        const targetLeft = -index * this.props.imgWidth
        this.div.style.marginLeft = targetLeft
        // 得到当前的marginLeft
        let curLeft = parseFloat(getComputedStyle(this.div).marginLeft)
        // 计算运动次数
        const times = Math.ceil(this.props.duration / this.tick);
        let curTimes = 0
        const totalDis = targetLeft - curLeft; // 总距离
        const dis = totalDis / times // 每次运动的距离
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            curTimes++
            curLeft += dis
            this.div.style.marginLeft = curLeft + "px"
            if(curTimes === times){
                this.div.style.marginLeft = targetLeft + "px"
                clearInterval(this.timer)
            } 
        }, this.tick)


    }
    render() {
        const imgs = this.props.imgSrcs.map((src, i) => <img key={i} src={src} alt='' style={{
            width: this.props.imgWidth,
            height: this.props.imgHeight,
            float: 'left'
        }} />)
        return (
            <div ref={this.containerRef} style={{
                width: this.props.imgSrcs.length * this.props.imgWidth,
                height: this.props.imgHeight
            }}>
                {imgs}
            </div>
        )
    }
}
