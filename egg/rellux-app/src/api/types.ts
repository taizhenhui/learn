
/**
 * 订单列表 接口
 */
export interface ICaptcha {
  captcha: string
}

export interface ILoginReq {
  code: string,
  account: string,
  password: string
}
export interface ILoginRes {
  token: string
}

export interface IUserListReq {
  pageNum?: number
  pageSize?: number
  operator_name?: string
  email?: string
  phone?: string
  account?: string
}
export interface IListItem {
  id: number | string
  operator_name: string
  phone: string
  account: string
  email: string
  description: string
  account_expired: number
  enabled: number
  preset: number
  create_time: string
  update_time: string
  create_oper_username: string
  update_oper_username: string
  [propsName: string]: any
}
export interface IUserListRes {
  rows: IListItem[],
  total: number;
  pageNum: number;
  pageSize: number;
}