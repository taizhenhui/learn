import { orderList } from '@/api'
import { IorderListRequest, IorderListRows } from '@/api/types'
import { useAppStore } from '@/stores'
import { ref } from 'vue'


const useGetList = async () => {
  const { phone } = useAppStore()

  let pageNum = ref<number>(1)
  let pageSize = ref<number>(10)
  let total: number = 0
  let list = ref<Array<IorderListRows>>([])
  const queryInfo: IorderListRequest = {
    phone,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }
  const data =  await orderList(queryInfo)
  const getlist = async () => {
    return await orderList(queryInfo)
  }

  return {
    data,
  }
}

export default useGetList
