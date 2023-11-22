import React from 'react'
import routeConfig from './routeConfig'
import { Route, Switch } from 'react-router-dom'


function getRoutes(routes, basePath) {
    if (!Array.isArray(routes)) return null;
    const rs = routes.map((rt, i) => {
        const { children, name, path, component: Component, ...rest } = rt
        let newPath = `${basePath}${path}`;
        newPath = newPath.replace(/\/\//g, "/");
        return <Route key={i} {...rest}
            path={newPath}
            render={values => {
                return (
                    <Component {...values}>
                        {getRoutes(children, newPath)}
                    </Component>
                )
            }} />

    })
    return <Switch> {rs} </Switch>

}
export default function RootRouter() {
    return (
        <>
            {getRoutes(routeConfig, '/')}
        </>
    )
}
