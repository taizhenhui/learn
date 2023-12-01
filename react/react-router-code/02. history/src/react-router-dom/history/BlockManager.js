export default class BlockManager {


    constructor(getUserConfirmation){
        this.prompt = null // 该属性是否有值，决定了是否有阻塞
        this.getUserConfirmation = getUserConfirmation
    }
    /**
     * 设置一个阻塞，传递一个提示消息
     * @param {*} prompt 可以是字符串，也可以是一个函数，函数返回一个消息字符串
     */
    block(prompt){
        this.prompt = prompt;
        return () => {
            this.prompt = null
        }
    }

    triggerBlock(location, action, cb){
        
        if(!this.prompt){
            cb()
            return
        }
        if(typeof this.prompt !== 'string' && typeof this.prompt !== 'function'){
            throw new TypeError('block must be string or function')
        }
        let message // 阻塞消息
        if(typeof this.prompt === 'string'){
            message = this.prompt
        }else if(typeof this.prompt === 'function'){
            message = this.prompt(location, action)
        }
        // 
        this.getUserConfirmation(message, result => {
            if(result){
                // 可以跳转
                cb()
            }
        })
        
    }
}