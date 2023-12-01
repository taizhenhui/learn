
import BlockManager from "./BlockManager"
import ListenerManager from "./ListenerManager"


/**
 * 创建一个history api的history对象
 * @param {*} options 
 */
export default function createBrowserHistory(options = {}) {
    const {
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (msg, cb) => cb(window.confirm(msg)),
    } = options
    const listenerManager = new ListenerManager()
    const blockManager = new BlockManager(getUserConfirmation)
    function go(step) {
        window.history.go(step)
    }
    function goBack() {
        window.history.back()
    }
    function goForward() {
        window.history.forward()
    }

    /**
     * 向地址栈中加入一个新的地址
     * @param {*} path 新的地址信息，可以是字符串，也可以是对象
     * @param {*} state 附加的状态数据，如果第一个参数是对象，该参数无效
     */
    function push(path, state) {
        changePage(path, state, true)
    }

    /**
     * 替换一个新的地址
     * @param {*} path 新的地址信息，可以是字符串，也可以是对象
     * @param {*} state 附加的状态数据，如果第一个参数是对象，该参数无效 
     */
    function replace(path, state) {
        changePage(path, state, false)
    }

    /**
     * 用于实现push和replace的方法
     * @param {*} path 
     * @param {*} state 
     * @param {*} isPush 
     */
    function changePage(path, state, isPush) {

        const pathInfo = handlePathAndState(path, state, basename)
        const action = isPush ? 'PUSH' : 'REPLACE'

        const location = createLocationFromPath(pathInfo, basename)
        blockManager.triggerBlock(location, action, () => {
            if (isPush) {
                window.history.pushState({
                    key: createKey(keyLength),
                    state: pathInfo.state
                }, null, pathInfo.path)
            } else {
                window.history.replaceState({
                    key: createKey(keyLength),
                    state: pathInfo.state
                }, null, pathInfo.path)

            }
            listenerManager.triggerListener(location, action)
            // 改变action
            history.action = action
            // 改变location
            history.location = location
            if (forceRefresh) {
                // 强制刷新
                window.location.href = pathInfo.path
            }

        })
    }

    /**
     * 添加对地址变化的监听
     */
    function addDomListener() {
        // popstate事件，仅能监听前进、后退、用户对地址hash的改变
        // 无法监听到pushState和replaceState
        window.addEventListener('popstate', () => {
            const location = createLocation(basename)
            blockManager.triggerBlock(location, "POP", () => {
                listenerManager.triggerListener(location, "POP")
                history.location = location
            })

        })
    }
    addDomListener()

    /**
     * 添加一个监听器，并且返回一个可用于取消监听的函数
     * @param {*} listener 
     */
    function listen(listener) {
        return listenerManager.addListener(listener)
    }
    function block(prompt) {
        return blockManager.block(prompt)
    }

    function createHref(location) {
        let { pathname = "/", search = "", hash = "" } = location;
        if (search.charAt(0) === "?" && search.length === 1) {
            search = "";
        }
        if (hash.charAt(0) === "#" && hash.length === 1) {
            hash = "";
        }
        return basename + pathname + search + hash;
    }

    const history = {
        action: 'POP',
        length: window.history.length,
        go,
        goBack,
        goForward,
        push,
        replace,
        listen,
        block,
        createHref,
        location: createLocation(basename)
    }
    // 返回history对象
    return history
}

/**
 * 根据path和state，得到一个统一的对象格式
 * @param {*} path 
 * @param {*} state 
 */
function handlePathAndState(path, state, basename) {
    if (typeof path === 'string') {
        return {
            path: basename + path,
            state,
        }
    } else if (typeof path === 'object') {
        let pathResult = basename + path.pathname;
        let { search = '', hash = '' } = path;
        if (search && search.charAt(0) !== '?') {
            search = '?' + search;
        }
        if (hash && hash.charAt(0) !== '#') {
            hash = '#' + hash;
        }
        pathResult = pathResult + search;
        pathResult = pathResult + hash;
        return {
            path: pathResult,
            state: path.state
        }
    } else {
        throw new TypeError('path 类型是字符串或对象')
    }
}

/**
 * 创建一个locaotion对象
 * @param {*} basename 
 * @returns 
 */
function createLocation(basename = '') {

    let pathname = window.location.pathname;
    // 处理basename的情况
    let reg = new RegExp('^' + basename);
    pathname = pathname.replace(reg, '')

    let location = {
        hash: window.location.hash,
        search: window.location.search,
        pathname,
    }
    // 处理state
    let state, historyState = window.history.state
    if (historyState === null) {
        state = undefined
    } else if (typeof historyState !== 'object') {
        state = historyState
    } else {
        if ("key" in historyState) {
            location.key = historyState.key
            state = historyState.state
        } else {
            state = historyState
        }
    }
    location.state = state
    return location
}

/**
 * 根据pathInfo得到一个location对象
 * @param {*} pathInfo  {path:"/news/asdf#aaaaaa?a=2&b=3", state:状态}
 * @param {*} basename 
 */
function createLocationFromPath(pathInfo, basename) {
    //取出pathname
    let pathname = pathInfo.path.replace(/[#?].*$/, "");
    //处理basename的情况
    let reg = new RegExp(`^${basename}`);
    pathname = pathname.replace(reg, "");
    //search
    var questionIndex = pathInfo.path.indexOf("?");
    var sharpIndex = pathInfo.path.indexOf("#");
    let search;
    if (questionIndex === -1 || questionIndex > sharpIndex) {
        search = "";
    } else {
        search = pathInfo.path.substring(questionIndex, sharpIndex);
    }
    //hash
    let hash;
    if (sharpIndex === -1) {
        hash = "";
    } else {
        hash = pathInfo.path.substr(sharpIndex);
    }
    return {
        hash,
        pathname,
        search,
        state: pathInfo.state
    }
}

/**
 * 产生一个指定长度的随机字符串，随机字符串可以包含数字和字母
 * @param {*} keyLength 
 */
function createKey(keyLength) {
    return Math.random().toString(36).substring(2, keyLength + 2)
}