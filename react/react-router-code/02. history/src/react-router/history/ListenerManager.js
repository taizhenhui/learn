export default class ListenerManager {

    // 存放监听器的数组
    listeners = [];
    /**
     * 添加一个监听器，返回一个用于取消监听的函数
     * @param {*} listener 
     */
    addListener(listener){
        this.listeners.push(listener);
        const unListen = () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        }
        return unListen;
    }

    triggerListener(location, action){
        for (const listener of this.listeners) {
            listener(location, action)
        }
    }


}