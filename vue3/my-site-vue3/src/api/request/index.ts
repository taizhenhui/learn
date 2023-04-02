import { ExpandAxiosResponse, InterceptorHooks } from './config'
import Request from './request'
const transform: InterceptorHooks = {
  requestInterceptor(config) {
    // 请求头部处理，如添加 token
    // const token = 'token-value'
    // if (token) {
    //   config!.headers!.Authorization = token
    // }
    console.log('requestInterceptor', config)
    return config
  },
  requestInterceptorCatch(err) {
    console.log('requestInterceptorCatch', err)
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(err)
  },
  responseInterceptor(result) {
    const res = result as ExpandAxiosResponse
    console.log(res, 'responseInterceptor--res')

    // 与后端约定的请求成功码
    const SUCCESS_CODE = 0
    if (res.status !== 200) return Promise.reject(res)
    if (res.data.code !== SUCCESS_CODE) {
      if (res.config.requestOptions?.globalErrorMsg) {
        // 这里全局提示错误
        console.error(res.data.msg)
      }
      return Promise.reject(res.data)
    }
    if (res.config.requestOptions?.globalSuccessMsg) {
      // 这里全局提示请求成功
      console.log(res.data.msg)
    }
    return result.data.data
  },
  responseInterceptorCatch(err) {
    // 这里用来处理 http 常见错误，进行全局提示
    console.log('responseInterceptorCatch', err)

    const mapErrorStatus = new Map([
      [400, '请求方式错误'],
      [401, '请重新登录'],
      [403, '拒绝访问'],
      [404, '请求地址有误'],
      [500, '服务器出错'],
    ])
    const message =
      mapErrorStatus.get(err.response.status) || '请求出错，请稍后再试'
    // 此处全局报错
    console.error(message)
    return Promise.reject(err.response)
  },
}

// 具体使用时先实例一个请求对象
export const request = new Request({
  baseURL: '/api',
  timeout: 5000,
  interceptorHooks: transform,
})
