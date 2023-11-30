import { createBrowserHistory } from 'history'

// console.log(history);

window.h = createBrowserHistory({
    baseName: '/news',
    forceRefresh: true,
    keyLength: 4,
    getUserConfirmation: (message, callback) => {
        // callback(window.confirm(message))
        console.log(213);
    }
})

window.h.listen((location, action) => {
    console.log(location, action)
})