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
  pageNum?: number,
  pageSize?: number,
  [propsName: string]: any;
}

export enum Align {
  center,
  left,
  right
}

export enum SelectTypes {
  index,
  multiple,
  single,
  expand,
  other
}