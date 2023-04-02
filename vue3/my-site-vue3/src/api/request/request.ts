import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import {
  BaseApiResponse,
  ExpandAxiosRequestConfig,
  InterceptorHooks,
} from './config'

// 导出Request类，可以用来自定义传递配置来创建实例
export default class Request {
  // axios 实例
  private _instance: AxiosInstance
  // 默认配置
  private _defaultConfig: ExpandAxiosRequestConfig = {
    baseURL: '/api',
    timeout: 60000,
    requestOptions: {
      globalErrorMsg: true,
      globalSuccessMsg: true,
    },
  }

  private _interceptorHooks?: InterceptorHooks

  constructor(config: ExpandAxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this._instance = axios.create(Object.assign(this._defaultConfig, config))
    this._interceptorHooks = config.interceptorHooks
    this.setupInterceptors()
  }

  // 通用拦截，在初始化时就进行注册和运行，对基础属性进行处理
  private setupInterceptors() {
    this._instance.interceptors.request.use(
      this._interceptorHooks?.requestInterceptor,
      this._interceptorHooks?.requestInterceptorCatch
    )
    this._instance.interceptors.response.use(
      this._interceptorHooks?.responseInterceptor,
      this._interceptorHooks?.responseInterceptorCatch
    )
  }

  // 定义核心请求
  public get<T>(
    url: string,
    params?: any
  ): Promise<AxiosResponse<BaseApiResponse<T>>> {
    const config: ExpandAxiosRequestConfig = { params } 
    return this._instance.get(url, config)
  }
  public post<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig
  ): Promise<T> {
    return this._instance.post(url, data, config)
  }

}
