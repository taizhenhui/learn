import { request } from '@/api/request'
import { IUserListReq, IUserListRes } from '../types'

export const userList = (data: IUserListReq) => {
  return request.post<IUserListRes>('/user', data)
}