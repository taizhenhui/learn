import pathToRegexp from "path-to-regexp"

/**
 * 得到匹配结果，不能匹配返回undefined。能匹配，匹配结果是一个对象
 * @param {*} path 路径规则 
 * @param {*} options 相关配置, 该配置是一个对象，该对象中，可以出现: exact、sensitive、strict
 */
export default function pathMatch(path, options) {
    const { pathname } = window.location
    const keys = [] // 保存路径规则中的关键字
    const regExp = pathToRegexp(path, keys, getOptions(options))
    const result = regExp.exec(pathname) // 匹配url地址
    if (!result) {
        return
    }
    let groups = Array.from(result)
    groups = groups.slice(1)
    let params = getParams(groups, keys)
    return {
        isExact: result[0] === pathname,
        params,
        path,
        url: result[0]
    }
}


function getOptions(options = {}) {
    const defaultOptions = {
        exact: false,
        strict: false,
        sensitive: false
    }
    const opts = Object.assign({}, defaultOptions, options)
    return {
        sensitive: opts.sensitive,
        strict: opts.strict,
        end: opts.exact,
    }
}

/**
 * 根据匹配的分组结果，得到一个params对象
 * @param {*} groups 
 * @param {*} keys 
 * @returns
 */
function getParams(groups, keys) {
    let params = {}
    for (let i = 0; i < groups.length; i++) {
        const value = groups[i]
        const name = keys[i].name
        params[name] = value
    }
    return params
}


const pm = pathMatch('/news/:id/:page')
console.log(pm);