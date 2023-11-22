import React from 'react'
import { Link } from 'react-router-dom'
import routeConfig from './routeConfig'
export default function BetterLink({ to, ...rest }) {
    if (to.name && typeof to !== 'string') {
        to.pathname = getPathFromName(to.name, '/', routeConfig)
        if(to.pathname === undefined){
            throw new Error('路由配置错误')
        }
    }
    return (
        <Link {...rest} to={to}></Link>
    )
}

function getPathFromName(name, baseUrl, routesArr) {
    for (let item of routesArr) {
        let newPath = baseUrl + item.path
        newPath = newPath.replace(/\/\//g, '/')
        if (item.name === name) {
            return newPath
        } else {
            if (Array.isArray(item.children)) {
                const path = getPathFromName(name, newPath, item.children)
                if(path !== undefined){
                    return path
                }
            }

        }
    }
}
