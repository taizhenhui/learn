
import { request } from '@/api/request'
import type { IorderListResponse, IorderListRequest } from "./types";

export const orderList = (data: IorderListRequest) => {
  return request.get<IorderListResponse>('/rellux-advance/advance/order/list', data)
}
