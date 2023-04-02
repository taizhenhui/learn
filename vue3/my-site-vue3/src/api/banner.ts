import { AxiosResponse } from "axios";
import { request } from "./request";
import { BaseApiResponse } from "./request/config";
interface IDataType {
  bigImg: string
  description: string
  id: string
  midImg: string
  title: string
}
export const getBanners = () => {
   return request.get<IDataType>('/banner')
}