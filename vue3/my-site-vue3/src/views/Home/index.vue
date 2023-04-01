<template>
  <div class="home-container">
    <h1>首页</h1>
    <MessageArea
      title="留言板"
      :subTitle="`(12)`"
      :list="list"
      :isListLoading="false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import MessageArea from '@/components/MessageArea/index.vue'
import { ref } from 'vue'
import { FormDataType, IList } from '@/types'

const list = ref<Array<IList>>([
  {
    id: '1',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682921186&t=8d91e34b33a95390054168eb917cb201',
    nickname: 'name11',
    content: 'content11',
    createDate: 'date',
  },
  {
    id: '2',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682921186&t=8d91e34b33a95390054168eb917cb201',
    nickname: 'name22',
    content: 'content22',
    createDate: 'date22',
  },
])

const handleSubmit = (data: FormDataType, cb: (successMsg: string) => void) => {
  console.log(data,'data---data')
  cb('感谢您的留言')
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
</style>
