import Home from './Home'
import News from './News'
import NewsDetail from './NewsDetail'
import NewsHome from './NewsHome'
import NewsSearch from './NewsSearch'

export default [

    {
        path: '/news',
        component: News,
        name:'news',
        children: [
            { path: '/', exact: true, name:'newsHome', component: NewsHome },
            { path: '/detail', exact: true, name:'newsDetail', component: NewsDetail },
            { path: '/search', exact: true, name:'newsSearch', component: NewsSearch },
        ]
    },
    { path: '/', name:'home', component: Home },
]