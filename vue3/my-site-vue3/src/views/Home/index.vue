<template>
  <div class="home-container">
    <h1>首页</h1>
    <!-- <MessageArea
      title="留言板"
      :subTitle="`(12)`"
      :list="list"
      :isListLoading="false"
      @submit="handleSubmit"
    /> -->
    <Pages
      :current="routeInfo.page"
      :total="routeInfo.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    ></Pages>
    {{ routeInfo.page }}
  </div>
</template>

<script setup lang="ts">
import MessageArea from '@/components/MessageArea/index.vue'
import Pages from '@/components/Pager/index.vue'
import { reactive, ref } from 'vue'
import { FormDataType, IList } from '@/types'
import { getBanners } from '@/api/banner'

interface IPages {
  page?: number
  total?: number
  limit?: number
  visibleNumber?: number
}
const routeInfo: IPages = reactive({
  page: 1,
  total: 52,
  limit: 10,
  visibleNumber: 10,
})

const handlePageChange = (newpage: number) => {
  routeInfo.page = newpage
}
const list = ref<Array<IList>>([
  {
    id: '1',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682921186&t=8d91e34b33a95390054168eb917cb201',
    nickname: 'name11',
    content: 'content11',
    createDate: 'date',
  },
  {
    id: '2',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682921186&t=8d91e34b33a95390054168eb917cb201',
    nickname: 'name22',
    content: 'content22',
    createDate: 'date22',
  },
])

const handleSubmit = (data: FormDataType, cb: (successMsg: string) => void) => {
  console.log(data, 'data---data')
  cb('感谢您的留言')
}
const resp = await getBanners()
console.log(resp,'resp---resp');

</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
</style>
