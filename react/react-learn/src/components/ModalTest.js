import React, { Component } from 'react'
import Modal from './Modal'

export default class ModalTest extends Component {
    state = {
        showModal: false
    }
    showModal = () => {
        this.setState({
            showModal: true
        })
    }
    hideModal = () => {
        this.setState({
            showModal: false
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.showModal}>显示</button>
                <img src="https://t7.baidu.com/it/u=2141219545,3103086273&fm=193&f=GIF" alt="" />
                {
                    this.state.showModal
                        ?
                        (<Modal
                            onClose={this.hideModal}
                            bg={'rgba(0,0,0,0.3)'}>
                            <div
                                style={{
                                    background: "#fff"
                                }}
                            >
                                <h1>asdfasdfsadf</h1>
                                <button onClick={this.hideModal}>关闭</button>

                            </div>
                        </Modal>)
                        : null
                }

            </div>
        )
    }
}
