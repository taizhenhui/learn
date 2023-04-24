
import { request } from '@/api/request'
import { ICaptcha, ILoginReq, ILoginRes } from './types'



export const login = (data: ILoginReq) => {
  return request.post<ILoginRes>('/user/login', data)
}

export const getCaptcha = () => {
  return request.get<ICaptcha>('/user/captcha')
}
export * from './modules/systemMan'


