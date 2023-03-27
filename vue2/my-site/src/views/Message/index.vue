<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea title="留言板" :subTitle="`(${datas.total})`" :list="datas.rows" :isListLoading="isLoading"
      @submit="handleSubmit" />
      <ToTop />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea'
import fetchData from '@/mixins/fetchData'
import { getMessages, postMessage } from "@/api/message"
import mainScroll from '@/mixins/mainScroll'
import ToTop from '@/components/ToTop'
export default {
  name: 'message',
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll('messageContainer')],
  components: {
    ToTop,
    MessageArea
  },
  data() {
    return {
      formData:{
        page:1,
        limit: 10
      }
    }
  },
  computed:{
    hasMore(){
      return this.datas.rows.length < this.datas.total
    }
  },
  created() {
    this.fetchData()
    this.$bus.$on('mainScroll', this.handleScroll)
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.handleScroll)
  },
  methods: {
    async fetchMore(){
      if(!this.hasMore) return
      this.isLoading = true
      this.formData.page++
      let res = await this.fetchData()
      this.datas.total = res.total
      this.datas.rows = this.datas.rows.concat(res.rows)
      this.isLoading = false
    },
    async handleScroll(dom){
      if(this.isLoading || !dom) return

      const range = 100
      const dec = Math.abs(dom.scrollHeight - (dom.scrollTop + dom.clientHeight))

      if(dec <= range) this.fetchMore()
      
    },
    async fetchData() {
      return await getMessages(this.formData)
    },
    async handleSubmit(data, cb) {
      const resp = await postMessage(data)
      this.datas.rows.unshift(resp)
      cb('感谢您的留言')
    }
  },
}
</script>

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
