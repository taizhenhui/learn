
import { request } from '@/api/request'
import { ICaptcha } from './types'
// export const login = (data: IorderListRequest) => {
//   return request.get<IorderListResponse>('/rellux-advance/advance/order/list', data)
// }


export const getCaptcha = () => {
  return request.get<ICaptcha>('/user/captcha')
}
export * from './modules/systemMan'


