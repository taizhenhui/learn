
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