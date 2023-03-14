<template>
  <div class="blog-comment-container">
    <MessageArea 
      title="评论列表" 
      @submit="handleSubmit"
      :isListLoading="isLoading"
      :subTitle="`(${datas.total})`" 
      :list="datas.rows"/>
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea'
import fetchData from '@/mixins/fetchData.js'
import { getComment, postComment} from '@/api/blog'
export default {
  name: 'BlogComment',
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea
  },
  data(){
    return {
      formData:{
        page:1,
        limit: 10,
        blogid: this.$route.params.id
      }
    }
  },
  computed:{
    hasMore(){
      return this.datas.rows.length < this.datas.total
    }
  },
  created(){
    this.$bus.$on('mainScroll', this.handleScroll)
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.handleScroll)
  },
  methods:{
    async fetchData(){
      return await getComment(this.formData)
    },
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
    async handleSubmit(formData, callback){
      let res = await postComment({...formData, blogid: this.$route.params.id})
      this.datas.rows.unshift(res)
      this.datas.total++
      callback('评论成功')
    }
  }
}
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
