export interface IList {
  id: string
  avatar: string
  nickname: string
  content: string
  createDate: string
}
export type FormDataType = {
  nickname: string
  content: string
}

export type ErrorType = {
  nickname: string
  content: string
}
