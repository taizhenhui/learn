export interface IDataSource {
  type: string
  colSpan: number,
  label: string
  prop: string
  maxlength?: number | string
  place: string
  [propsName: string]: any
}
export interface IFormData {
  [propsName: string]: any;
}