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

    }
  },
  methods:{
    async fetchData(){
      let data= {
        page:1,
        limit: 10,
        blogid: this.$route.params.id
      }
      return await getComment(data)
    },
    async handleSubmit(formData, callback){
      let res = await postComment({...formData, blogid: this.$route.params.id})
      console.log(res,'result');
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
