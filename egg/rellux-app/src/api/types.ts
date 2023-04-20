
/**
 * 订单列表 接口
 */
export interface IorderListRequest {
  phone: string
  pageNum: number,
  pageSize: number
}
export interface IorderListRows {
  advanceOrderNo: string
  advanceStatus: number
  lessonName: string
  logoUrl: string
  [propsName: string]: any
}
export interface IorderListResponse {
  pageNum: number
  pageSize: number
  total: number
  rows: Array<IorderListRows>
  [propsName: string]: any
}